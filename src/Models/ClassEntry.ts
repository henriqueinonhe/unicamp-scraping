import { ClassScheduleEntry } from "./ClassScheduleEntry";

export class ClassEntry
{
  constructor(professors : Array<string>, schedule : Array<ClassScheduleEntry>)
  {
    this.professors = professors;
    this.schedule = schedule;
  }

  public professors : Array<string>;
  public schedule : Array<ClassScheduleEntry>;
}