import { InstituteEntry } from "./InstituteEntry";
import { SubjectEntry } from "./SubjectEntry";
import { ClassScheduleEntry } from "./ClassScheduleEntry";

export class ProfessorProfile
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