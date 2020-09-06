import { DayTime } from "./DayTime";

export interface ProfessorProfileInstitute
{
  acronym : string;
  name : string;
  link : string;
}

export interface ProfessorProfileSubject
{
  code : string;
  name : string;
  link : string;
}

export interface ProfessorProfileClass
{
  weekDay : string;
  beginTime : DayTime;
  endTime : DayTime;
  classRoom : string;
  subjectCode : string;
}

export class ProfessorProfile
{
  constructor(name : string)
  {
    this.name = name;
    this.institutes = [];
    this.subjects = [];
    this.classes = [];
  }

  public static deserialize(object : Record<string, unknown>) : ProfessorProfile
  {
    const {name, institutes, subjects, classes} = object;

    const profile = new ProfessorProfile(name as string);
    profile.institutes = institutes as Array<ProfessorProfileInstitute>;
    profile.subjects = subjects as Array<ProfessorProfileSubject>;
    profile.classes = ProfessorProfile.deserializeClasses(classes as Array<Record<string, unknown>>);

    return profile;
  }

  private static deserializeClasses(array : Array<Record<string, unknown>>) : Array<ProfessorProfileClass>
  {
    type serializedDayTime = {hour : number; minute : number};
    const classes = [];
    for(const element of array)
    {
      classes.push({
        weekDay: element.weekDay as string,
        beginTime: DayTime.deserialize(element.beginTime as Record<string, unknown>),
        endTime:  DayTime.deserialize(element.endTime as Record<string, unknown>),
        classRoom: element.classRoom as string,
        subjectCode: element.subjectCode as string
      });
    }

    return classes;
  }

  public name : string;
  public institutes : Array<ProfessorProfileInstitute>;
  public subjects : Array<ProfessorProfileSubject>;
  public classes : Array<ProfessorProfileClass>;
}