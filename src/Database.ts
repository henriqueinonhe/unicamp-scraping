import mongodb from "mongodb";
import { ProfessorProfile } from "./Models/ProfessorProfile";
import { InstituteEntry } from "./Models/InstituteEntry";

export class Database
{
  public static async storeProfessorsProfiles(profiles : Array<ProfessorProfile>) : Promise<void>
  {
    //Database Connect
    const mongoURI = process.env.DB_URI!;
    const mongoClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true });
    await mongoClient.connect();

    //Save data in database
    const database = mongoClient.db();
    const collection = database.collection("professors");
    await collection.deleteMany({});
    await collection.insertMany(profiles);

    //Close Connection
    await mongoClient.close();
  }

  public static async storeCrudeData(entries : Array<InstituteEntry>) : Promise<void>
  {
    //Database Connect
    const mongoURI = process.env.DB_URI!;
    const mongoClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true });
    await mongoClient.connect();

    //Save data in database
    const database = mongoClient.db();
    const collection = database.collection("crudeData");
    await collection.deleteMany({});
    await collection.insertMany(entries);

    //Close Connection
    await mongoClient.close();
  }

  public static async fetchProfessorsInitialData() : Promise<Array<ProfessorProfile>>
  {
    //Database Connect
    const mongoURI = process.env.DB_URI!;
    const mongoClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true });
    await mongoClient.connect();

    //Fetch
    const database = mongoClient.db();
    const collection = database.collection(process.env.DB_COLLECTION!);
    const data = await collection.find({}).project({name: 1}).toArray(); //FIXME

    //Close Connection
    await mongoClient.close();

    return data as Array<ProfessorProfile>;
  }
}