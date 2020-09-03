import dotenv from "dotenv";
import moment from "moment";
import { ClassScheduleEntry, ClassEntry } from "./scraping";
import mongodb from "mongodb";

//Initalization
dotenv.config();

//Rest
class ProfessorProfile
{
  constructor(name : string, classSchedules : Array<ClassScheduleEntry>)
  {
    this.name = name;
    this.classSchedules = classSchedules;
  }

  public getName() : string
  {
    return this.name;
  }

  public getClassSchedules() : Array<ClassScheduleEntry>
  {
    return this.classSchedules.slice();
  }

  private name : string;
  private classSchedules : Array<ClassScheduleEntry>;
}

async function fetchProfessorsSchedules() : Promise<Array<ProfessorProfile>>
{
  //Dabatase and deserialziation
  const mongoURI = process.env.DB_URI!;
  const mongoClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true });
  await mongoClient.connect();

  const database = mongoClient.db("unicamp-docentes");
  const collection = database.collection("classEntries");
  const serializedClassEntries = await collection.find({}).toArray();
  const classEntries = serializedClassEntries.map(entry => new ClassEntry(entry.subjectEntry, entry.professors, entry.schedule));

  await mongoClient.close();

  //Professors Profiles
  const professorsProfiles = new Map<string, ProfessorProfile>();

  for(const classEntry of classEntries)
  {
    const professors = classEntry.getProfessors();
    for(const professor of professors)
    {
      if(!professorsProfiles.has(professor))
      {
        professorsProfiles.set(professor, new ProfessorProfile(professor, []));
      }
      //FIXME!
      
    }
  }

  return [];
}

