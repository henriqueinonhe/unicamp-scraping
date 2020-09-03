import puppeteer from "puppeteer";
import mongodb from "mongodb";

export class InstituteEntry
{
  constructor(acronym : string, name : string, link : string)
  {
    this.acronym = acronym;
    this.name = name;
    this.link = link;
  }

  public acronym : string;
  public name : string;
  public link : string;
}

export class SubjectEntry
{
  constructor(instituteEntry : InstituteEntry, code : string, name : string, link : string)
  {
    this.instituteEntry = instituteEntry;
    this.code = code;
    this.name = name;
    this.link = link;
  }

  public instituteEntry : InstituteEntry;
  public code : string;
  public name : string;
  public link : string;
}

export class ClassScheduleEntry
{
  constructor(weekDay : string, beginTime : string, endTime : string, classRoom : string)
  {
    this.weekDay = weekDay;
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.classRoom = classRoom;
  }

  public weekDay : string;
  public beginTime : string;
  public endTime : string;
  public classRoom : string;
}

export class ClassEntry
{
  constructor(subjectEntry : SubjectEntry, professors : Array<string>, schedule : Array<ClassScheduleEntry>)
  {
    this.subjectEntry = subjectEntry;
    this.professors = professors;
    this.schedule = schedule;
  }

  public static deserialize(object : object) : ClassEntry
  {
    const {subjectEntry, professors, schedule} = object as ClassEntry;
    return new ClassEntry(subjectEntry, professors, schedule);
  } 

  public getInstituteAcronym() : string
  {
    return this.subjectEntry.instituteEntry.acronym;
  }

  public getInstituteName() : string
  {
    return this.subjectEntry.instituteEntry.name;
  }

  public getInstituteLink() : string
  {
    return this.subjectEntry.instituteEntry.link;
  }

  public getSubjectCode() : string
  {
    return this.subjectEntry.code;
  }

  public getSubjectName() : string
  {
    return this.subjectEntry.name;
  }

  public getSubjectLink() : string
  {
    return this.subjectEntry.link;
  }

  public getProfessors() : Array<string>
  {
    return this.professors;
  }

  public getSchedule() : Array<ClassScheduleEntry>
  {
    return this.schedule;
  }

  private subjectEntry : SubjectEntry;
  private professors : Array<string>;
  private schedule : Array<ClassScheduleEntry>;
}

async function scrapInstituteEntries(page : puppeteer.Page) : Promise<Array<InstituteEntry>>
{
  console.time("Institute entries scraping elapsed time");

  await page.goto("https://www.dac.unicamp.br/portal/caderno-de-horarios/2020/1/S/G");

  const instituteEntries : Array<InstituteEntry> = [];
  const instituteNodes = await page.$$(".lista-oferecimento a");
  for(const node of instituteNodes)
  {
    const text = await node.evaluate(element => element.textContent);
    const whitespaceStrippedText = text?.replace(/ {2,}/g, "");
    const [acronym, name] = whitespaceStrippedText!.split("\n").filter(str => str !== "");
    const link = await node.evaluate(element => element.getAttribute("href"));

    instituteEntries.push(new InstituteEntry(acronym, name, link!));
  }

  console.timeEnd("Institute entries scraping elapsed time");

  return instituteEntries;
}

async function scrapSubjectEntries(instituteEntries : Array<InstituteEntry>, page : puppeteer.Page) : Promise<Array<SubjectEntry>>
{
  console.time("Subject entries scraping elapsed time");

  const subjectEntries = [];
  let instituteCounter = 1;
  for(const instituteEntry of instituteEntries)
  {
    const {link} = instituteEntry;
    await page.goto(link);
    
    const subjectNodes = await page.$$(".disciplinas-horario a");
    for(const node of subjectNodes)
    {
      const text = await node.evaluate(element => element.textContent);
      const whitespaceStrippedText = text?.replace(/ {2,}/g, "");
      const [code, name] = whitespaceStrippedText!.split("\n").filter(str => str !== "");
      const link = await node.evaluate(element => element.getAttribute("href"));
      
      subjectEntries.push(new SubjectEntry(instituteEntry, code, name, link!));

    }

    console.log(`Institute ${instituteCounter} of ${instituteEntries.length}`);
    instituteCounter++;
  }

  console.timeEnd("Subject entries scraping elapsed time");

  return subjectEntries;
}

async function scrapClassEntries(subjectEntries : Array<SubjectEntry>, page : puppeteer.Page) : Promise<Array<ClassEntry>>
{
  console.time("Class entries scraping elpased time");

  const classEntries : Array<ClassEntry> = [];
  let subjectCounter = 1;
  for(const subjectEntry of subjectEntries)
  {
    await page.goto(subjectEntry.link);
    const classNodes = await page.$$(".panel-body");
    
    for(const node of classNodes)
    {
      const professors = await node.$$eval(".docentes>li", array => array.map(element => element.textContent?.replace(/\s+$/, "")!));
      const schedule = await node.$$eval(".horariosFormatado>li", array => array.map(list => 
      {
        const weekDay = list.querySelector(".diaSemana")?.textContent!;
        const [beginTime, endTime] = list.querySelector(".horarios")?.textContent?.split(" - ")!;
        const classRoom = list.querySelector(".salaAula")?.textContent?.trim()!;

        return {weekDay, beginTime, endTime, classRoom};
      }));

      classEntries.push(new ClassEntry(subjectEntry, professors, schedule));

    }

    console.log(`Subject ${subjectCounter} of ${subjectEntries.length}`);
    subjectCounter++;
  }

  console.timeEnd("Class entries scraping elpased time");

  return classEntries;
}

export async function scrapData() : Promise<void> 
{
  //Database Connect
  const mongoURI = process.env.DB_URI!;
  const mongoClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true });
  try
  {
    await mongoClient.connect();
  }
  catch(error)
  {
    console.log(error);
  }

  //Scraping
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  const instituteEntries = await scrapInstituteEntries(page);
  const subjectEntries = await scrapSubjectEntries(instituteEntries, page);
  const classEntries = await scrapClassEntries(subjectEntries, page);

  //Save data in database
  const database = mongoClient.db();
  const collection = database.collection("classEntries");
  await collection.deleteMany({});
  await collection.insertMany(classEntries);

  await mongoClient.close();

  await browser.close();
}