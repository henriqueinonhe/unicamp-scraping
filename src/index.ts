import dotenv from "dotenv";
import moment from "moment";
import { ClassScheduleEntry, scrapData, InstituteEntry, SubjectEntry, ClassEntry } from "./scraping";
import mongodb from "mongodb";
import { Database } from "./database";

//Initalization
dotenv.config();

//Rest
class ProfessorProfile
{
  constructor(name : string)
  {
    this.name = name;
    this.instituteEntries = new Set();
    this.subjectEntries = new Set();
    this.classSchedules = [];
  }

  public name : string;
  public instituteEntries : Set<InstituteEntry>;
  public subjectEntries : Set<SubjectEntry>;
  public classSchedules : Array<ClassScheduleEntry>;
}

async function fetchProfessorsSchedules() : Promise<Map<string, ProfessorProfile>>
{
  const instituteEntries = await Database.fetchInstituteEntries();

  //Professors Profiles
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
          professorProfile.instituteEntries.add(instituteEntry);
          professorProfile.subjectEntries.add(subjectEntry);
          professorProfile.classSchedules.push(... classEntry.schedule);
        }
      }
    }
  }

  return professorsProfiles;
}

fetchProfessorsSchedules();