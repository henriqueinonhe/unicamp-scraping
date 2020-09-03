import { InstituteEntry } from "./InstituteEntry";
import { SubjectEntry } from "./SubjectEntry";
import { ClassScheduleEntry } from "./ClassScheduleEntry";

interface Institute
{
  acronym : string;
  name : string;
}

interface Subject
{
  code : string;
  name : string;
}

export class ProfessorProfile
{
  constructor(name : string)
  {
    this.name = name;
    this.instituteEntries = new Set();
    this.subjectEntries = new Set();
    this.classSchedules = [];
  }

  public static deserialize(object : Record<string, unknown>) : ProfessorProfile
  {
    const {name, instituteEntries, subjectEntries, classSchedules} = object;
    const profile = new ProfessorProfile(name as string);
    profile.instituteEntries = new Set<InstituteEntry>(instituteEntries as Array<InstituteEntry>);
    profile.subjectEntries = new Set<SubjectEntry>(subjectEntries as Array<SubjectEntry>);
    profile.classSchedules = classSchedules as Array<ClassScheduleEntry>;

    return profile;
  }

  public serialize() : object
  {
    return {
      name: this.name,
      instituteEntries: Array.from(this.instituteEntries),
      subjectEntries: Array.from(this.subjectEntries),
      classSchedules: this.classSchedules
    };
  }

  public name : string;
  public instituteEntries : Set<Institute>;
  public subjectEntries : Set<Subject>;
  public classSchedules : Array<ClassScheduleEntry>;
}