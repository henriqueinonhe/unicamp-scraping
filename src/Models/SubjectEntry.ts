import { ClassEntry } from "./ClassEntry";

export class SubjectEntry
{
  constructor(code : string, name : string, link : string)
  {
    this.code = code;
    this.name = name;
    this.link = link;
    this.classEntries = [];
  }

  public code : string;
  public name : string;
  public link : string;
  public classEntries : Array<ClassEntry>;
}