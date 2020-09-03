import mongodb from "mongodb";
import { InstituteEntry } from "./Models/InstituteEntry";

export class Database
{
  public static async storeInstituteEntries(entries : Array<InstituteEntry>) : Promise<void>
  {
    //Database Connect
    const mongoURI = process.env.DB_URI!;
    const mongoClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true });
    await mongoClient.connect();

    //Save data in database
    const database = mongoClient.db();
    const collection = database.collection(process.env.DB_COLLECTION!);
    await collection.deleteMany({});
    await collection.insertMany(entries);

    //Close Connection
    await mongoClient.close();
  }

  public static async fetchInstituteEntries() : Promise<Array<InstituteEntry>>
  {
    //Database Connect
    const mongoURI = process.env.DB_URI!;
    const mongoClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true });
    await mongoClient.connect();

    //Fetch Data
    const database = mongoClient.db("unicamp-docentes");
    const collection = database.collection("model");
    const instituteEntries = (await collection.find({}).toArray()).map(entry => InstituteEntry.deserialize(entry));

    //Close Connection
    await mongoClient.close();

    return instituteEntries;
  }
}