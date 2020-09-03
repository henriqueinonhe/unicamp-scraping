import puppeteer from "puppeteer";
import mongodb from "mongodb";
import { Database } from "./database";

export class InstituteEntry
{
  constructor(acronym : string, name : string, link : string)
  {
    this.acronym = acronym;
    this.name = name;
    this.link = link;
    this.subjectEntries = [];
  }

  public static deserialize(object : object) : InstituteEntry
  {
    const {acronym, name, link, subjectEntries} = object as InstituteEntry;
    const entry = new InstituteEntry(acronym, name, link);
    entry.subjectEntries = subjectEntries;
    return entry;
  }

  public acronym : string;
  public name : string;
  public link : string;
  public subjectEntries : Array<SubjectEntry>;
}

export class SubjectEntry
{
  constructor(code : string, name : string, link : string)
  {
    this.code = code;
    this.name = name;
    this.link = link;
    this.classEntries = [];
  }

  public code : string;
  public name : string;
  public link : string;
  public classEntries : Array<ClassEntry>;
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
  constructor(professors : Array<string>, schedule : Array<ClassScheduleEntry>)
  {
    this.professors = professors;
    this.schedule = schedule;
  }

  public professors : Array<string>;
  public schedule : Array<ClassScheduleEntry>;
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

async function scrapSubjectEntries(instituteEntries : Array<InstituteEntry>, page : puppeteer.Page) : Promise<void>
{
  console.time("Subject entries scraping elapsed time");

  let instituteCounter = 1;
  for(const instituteEntry of instituteEntries)
  {
    const subjectEntries = [];
    const {link} = instituteEntry;
    await page.goto(link);
    
    const subjectNodes = await page.$$(".disciplinas-horario a");
    for(const node of subjectNodes)
    {
      const text = await node.evaluate(element => element.textContent);
      const whitespaceStrippedText = text?.replace(/ {2,}/g, "");
      const [code, name] = whitespaceStrippedText!.split("\n").filter(str => str !== "");
      const link = await node.evaluate(element => element.getAttribute("href"));
      
      subjectEntries.push(new SubjectEntry(code, name, link!));
    }

    instituteEntry.subjectEntries = subjectEntries;
    console.log(`Institute ${instituteCounter} of ${instituteEntries.length}`);
    instituteCounter++;
  }

  console.timeEnd("Subject entries scraping elapsed time");
}

async function scrapClassEntries(instituteEntries : Array<InstituteEntry>, page : puppeteer.Page) : Promise<void>
{
  console.time("Class entries scraping elpased time");

  for(const instituteEntry of instituteEntries)
  {
    let subjectCounter = 1;
    const subjectEntries = instituteEntry.subjectEntries;
    for(const subjectEntry of subjectEntries)
    {
      const classEntries : Array<ClassEntry> = [];

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

        classEntries.push(new ClassEntry(professors, schedule));
      }

      subjectEntry.classEntries = classEntries;
      console.log(`Subject ${subjectCounter} of ${subjectEntries.length}`);
      subjectCounter++;
    }
  }

  console.timeEnd("Class entries scraping elpased time");
}

export async function scrapData() : Promise<void> 
{
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  
  const instituteEntries = await scrapInstituteEntries(page);
  await scrapSubjectEntries(instituteEntries, page);
  await scrapClassEntries(instituteEntries, page);

  Database.storeInstituteEntries(instituteEntries);

  await browser.close();
}