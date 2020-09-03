import { DayTime } from "./DayTime";

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

interface Class
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

  public name : string;
  public institutes : Array<Institute>;
  public subjects : Array<Subject>;
  public classes : Array<Class>;
}