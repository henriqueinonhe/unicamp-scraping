import mongodb from "mongodb";
import { ProfessorProfile } from "./Models/ProfessorProfile";
import { InstituteEntry } from "./Models/InstituteEntry";

export class MyDatabase
{
  public static mongoClient : mongodb.MongoClient;
  public static database : mongodb.Db;

  public static async initialize() : Promise<void>
  {
    //Database Connect
    const mongoURI = process.env.DB_URI!;
    MyDatabase.mongoClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true });
    await MyDatabase.mongoClient.connect();

    MyDatabase.database = MyDatabase.mongoClient.db();
  }

  public static async cleanup() : Promise<void>
  {
    //Close Database
    MyDatabase.mongoClient.close();
  }

  public static async storeProfessorsProfiles(profiles : Array<ProfessorProfile>) : Promise<void>
  {
    const collection = MyDatabase.database.collection("professors");
    await collection.deleteMany({});
    await collection.insertMany(profiles);
  }

  public static async storeCrudeData(entries : Array<InstituteEntry>) : Promise<void>
  {
    const collection = MyDatabase.database.collection("crudeData");
    await collection.deleteMany({});
    await collection.insertMany(entries);
  }

  public static async fetchProfessorsInitialData() : Promise<Array<ProfessorProfile>>
  {
    const collection = MyDatabase.database.collection("professors");
    const data = await collection.find({}).project({_id: 0, name: 1, institutes: 1}).toArray();

    return data as Array<ProfessorProfile>;
  }

  public static async fetchProfessorData(name : string) : Promise<ProfessorProfile>
  {
    const collection = MyDatabase.database.collection("professors");
    const data = await collection.findOne({name});
    return data;
  }
}