import { SubjectEntry } from "./SubjectEntry";

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