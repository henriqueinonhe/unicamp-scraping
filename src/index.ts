import dotenv from "dotenv";
import moment from "moment";
import { ClassScheduleEntry, scrapData, InstituteEntry, SubjectEntry, ClassEntry } from "./scraping";
import mongodb from "mongodb";

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
  //Dabatase and deserialziation
  const mongoURI = process.env.DB_URI!;
  const mongoClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true });
  await mongoClient.connect();

  const database = mongoClient.db("unicamp-docentes");
  const collection = database.collection("model");
  const instituteEntries = (await collection.find({}).toArray()).map(entry => InstituteEntry.deserialize(entry));

  await mongoClient.close();

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

  for(const professorProfile of professorsProfiles.values())
  {
    if(professorProfile.instituteEntries.size > 1)
    {
      console.log(professorProfile.name, Array.from(professorProfile.instituteEntries).map(entry => entry.acronym));
    }
  }

  return professorsProfiles;
}

fetchProfessorsSchedules();