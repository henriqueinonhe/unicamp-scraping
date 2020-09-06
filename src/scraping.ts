import puppeteer from "puppeteer";
import { MyDatabase } from "./MyDatabase";
import { InstituteEntry } from "./Models/InstituteEntry";
import { SubjectEntry } from "./Models/SubjectEntry";
import { ClassEntry } from "./Models/ClassEntry";
import { ClassScheduleEntry } from "./Models/ClassScheduleEntry";
import { DayTime } from "./Models/DayTime";
import { ProfessorProfile } from "./Models/ProfessorProfile";
import { startTimer, endTimer, printProgressBar } from "./utils";
import chalk from "chalk";

async function scrapInstituteEntries(page : puppeteer.Page) : Promise<Array<InstituteEntry>>
{
  console.log(chalk.yellow("Scrapping Institute Entries:"));
  const timer = startTimer();

  await page.goto("https://www.dac.unicamp.br/portal/caderno-de-horarios/2020/1/S/G");

  const instituteEntries : Array<InstituteEntry> = [];
  const instituteNodes = await page.$$(".lista-oferecimento a");
  let instituteCounter = 1;
  for(const node of instituteNodes)
  {
    const text = await node.evaluate(element => element.textContent);
    const whitespaceStrippedText = text?.replace(/ {2,}/g, "");
    const [acronym, name] = whitespaceStrippedText!.split("\n").filter(str => str !== "");
    const link = await node.evaluate(element => element.getAttribute("href"));

    instituteEntries.push(new InstituteEntry(acronym, name, link!));

    //Feedback
    process.stdout.clearLine(1);
    process.stdout.write(`\rInstitute ${instituteCounter} of ${instituteNodes.length} `);
    printProgressBar(instituteCounter, instituteNodes.length);
    instituteCounter++;
  }

  process.stdout.write("\n");
  endTimer(timer, "Scrapping institutes elasped time:");
  process.stdout.write("\n");
  
  return instituteEntries;
}

async function scrapSubjectEntries(instituteEntries : Array<InstituteEntry>, page : puppeteer.Page) : Promise<void>
{
  console.log(chalk.yellow("Scrapping Subject Entries:"));
  const timer = startTimer();

  let instituteCounter = 1;
  for(const instituteEntry of instituteEntries)
  {
    const subjectEntries = [];
    const {link} = instituteEntry;
    await page.goto(link);
    
    const subjectNodes = await page.$$(".disciplinas-horario a");
    let subjectCounter = 1;
    for(const node of subjectNodes)
    {
      const text = await node.evaluate(element => element.textContent);
      const whitespaceStrippedText = text?.replace(/ {2,}/g, "");
      const [code, name] = whitespaceStrippedText!.split("\n").filter(str => str !== "");
      const link = await node.evaluate(element => element.getAttribute("href"));
      
      subjectEntries.push(new SubjectEntry(code, name, link!));

      //Feedback
      process.stdout.clearLine(1);
      process.stdout.write(`\rInstitute ${instituteCounter} of ${instituteEntries.length} `);
      process.stdout.write(`Subject ${subjectCounter} of ${subjectNodes.length} `);
      printProgressBar(instituteCounter, instituteEntries.length);
      subjectCounter++;
    }

    instituteEntry.subjectEntries = subjectEntries;
    instituteCounter++;
  }

  process.stdout.write("\n");
  endTimer(timer, "Scrapping subjects elapsed time:");
  process.stdout.write("\n");
}

async function scrapClassEntries(instituteEntries : Array<InstituteEntry>, page : puppeteer.Page) : Promise<void>
{
  const timer = startTimer();
  console.log(chalk.yellow("Scraping Class Entries:"));

  let instituteCounter = 1;
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
        const serializedSchedule = await node.$$eval(".horariosFormatado>li", array => array.map(list => 
        {
          const weekDay = list.querySelector(".diaSemana")?.textContent!;
          const [beginTime, endTime] = list.querySelector(".horarios")?.textContent?.split(" - ")!;
          const classRoom = list.querySelector(".salaAula")?.textContent?.trim()!;

          return {weekDay, beginTime, endTime, classRoom};
        }));

        //Deserializing
        const schedule = serializedSchedule.map(item => new ClassScheduleEntry(item.weekDay, DayTime.fromString(item.beginTime), DayTime.fromString(item.endTime), item.classRoom));

        classEntries.push(new ClassEntry(professors, schedule));

        //Feedback
        process.stdout.clearLine(1);
        process.stdout.write(`\rInstitute ${instituteCounter} of ${instituteEntries.length} `);
        process.stdout.write(`Subject ${subjectCounter} of ${subjectEntries.length} `);
        printProgressBar(instituteCounter, instituteEntries.length);
      }

      subjectEntry.classEntries = classEntries;
      subjectCounter++;
    }

    instituteCounter++;
  }

  process.stdout.write("\n");
  endTimer(timer, "Scraping class entries elasped time: ");
  process.stdout.write("\n");
}

function weekDayToNumber(weekDay : string) : number
{
  if(weekDay === "Segunda")
  {
    return 0;
  }
  else if(weekDay === "Terça")
  {
    return 1;
  }
  else if(weekDay === "Quarta")
  {
    return 2;
  }
  else if(weekDay === "Quinta")
  {
    return 3;
  }
  else if(weekDay === "Sexta")
  {
    return 4;
  }
  else if(weekDay === "Sábado")
  {
    return 5;
  }
  else if(weekDay === "Domingo")
  {
    return 6;
  }
  else
  {
    throw new Error(`Invalid weekDay ("${weekDay}")!`);
  }
}

function generateProfessorsProfiles(instituteEntries : Array<InstituteEntry>) : Array<ProfessorProfile>
{
  const professorsProfiles = new Map<string, ProfessorProfile>();
  for(const instituteEntry of instituteEntries)
  {
    const subjectEntries = instituteEntry.subjectEntries;
    for(const subjectEntry of subjectEntries)
    {
      const classEntries = subjectEntry.classEntries;
      for(const classEntry of classEntries)
      {
        const professors = classEntry.professors;
        for(const professor of professors)
        {
          if(!professorsProfiles.has(professor))
          {
            professorsProfiles.set(professor, new ProfessorProfile(professor));
          }

          const professorProfile = professorsProfiles.get(professor)!;

          const institutes = professorProfile.institutes;
          const subjects = professorProfile.subjects;
          const classes = professorProfile.classes;
          if(institutes.every(institute => institute.acronym !== instituteEntry.acronym))
          {
            const {name, acronym, link} = instituteEntry;
            institutes.push({name, acronym, link});
          }

          if(subjects.every(subject => subject.code !== subjectEntry.code))
          {
            const {name, code, link} = subjectEntry;
            subjects.push({name, code, link});
          }

          classes.push(... classEntry.schedule.map(entry => 
          {
            return {
              weekDay: entry.weekDay,
              beginTime: entry.beginTime,
              endTime: entry.endTime,
              classRoom: entry.classRoom,
              subjectCode: subjectEntry.code
            };
          }));
        }
      }
    }
  }

  const professorsProfilesAsArray = Array.from(professorsProfiles.values());

  //Sort Schedule Entries
  for(const profile of professorsProfilesAsArray)
  {
    profile.classes.sort((class1, class2) =>
    {
      if(weekDayToNumber(class1.weekDay) < weekDayToNumber(class2.weekDay))
      {
        return -1;
      }
      else if(weekDayToNumber(class1.weekDay) > weekDayToNumber(class2.weekDay))
      {
        return 1;
      }
      else
      {
        return class1.beginTime.compare(class2.beginTime);
      }
    });
  }

  return professorsProfilesAsArray;
}

export async function scrapeData() : Promise<void> 
{
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
      
  await page.setRequestInterception(true);

  //Avoid loading unecessary resources
  page.on("request", (req) => 
  {
    if(req.resourceType() === "stylesheet" || req.resourceType() === "font" || req.resourceType() === "image")
    {
      req.abort();
    }
    else 
    {
      req.continue();
    }
  });

  const instituteEntries = await scrapInstituteEntries(page);
  await scrapSubjectEntries(instituteEntries, page);
  await scrapClassEntries(instituteEntries, page);
  const professorsProfiles = generateProfessorsProfiles(instituteEntries);

  await MyDatabase.storeCrudeData(instituteEntries);
  await MyDatabase.storeProfessorsProfiles(professorsProfiles);

  await browser.close();
}
