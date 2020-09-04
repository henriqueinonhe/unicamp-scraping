import mongodb from "mongodb";
import { ProfessorProfile } from "./Models/ProfessorProfile";
import { InstituteEntry } from "./Models/InstituteEntry";

export class Database
{
  public static mongoClient : mongodb.MongoClient;
  public static database : mongodb.Db;

  public static async initialize() : Promise<void>
  {
    //Database Connect
    const mongoURI = process.env.DB_URI!;
    Database.mongoClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true });
    await Database.mongoClient.connect();

    Database.database = Database.mongoClient.db();
  }

  public static async cleanup() : Promise<void>
  {
    //Close Database
    Database.mongoClient.close();
  }

  public static async storeProfessorsProfiles(profiles : Array<ProfessorProfile>) : Promise<void>
  {
    const collection = Database.database.collection("professors");
    await collection.deleteMany({});
    await collection.insertMany(profiles);
  }

  public static async storeCrudeData(entries : Array<InstituteEntry>) : Promise<void>
  {
    const collection = Database.database.collection("crudeData");
    await collection.deleteMany({});
    await collection.insertMany(entries);
  }

  public static async fetchProfessorsInitialData() : Promise<Array<ProfessorProfile>>
  {
    const collection = Database.database.collection("professors");
    const data = await collection.find({}).project({_id: 0, name: 1, institutes: 1}).toArray();

    return data as Array<ProfessorProfile>;
  }

  public static async fetchProfessorData(name : string) : Promise<ProfessorProfile>
  {
    const collection = Database.database.collection("professors");
    const data = await collection.findOne({name});
    return data;
  }
}