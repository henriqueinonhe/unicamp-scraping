import { Database } from "./database";
import { InstituteEntry } from "./Models/InstituteEntry";

export async function fetchInstituteEntries() : Promise<Array<InstituteEntry>>
{
  const instituteEntries = await Database.fetchInstituteEntries();
  return instituteEntries;
}
