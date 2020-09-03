import { DayTime } from "./DayTime";

export class ClassScheduleEntry
{
  constructor(weekDay : string, beginTime : DayTime, endTime : DayTime, classRoom : string, subjectCode : string)
  {
    this.weekDay = weekDay;
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.classRoom = classRoom;
    this.subjectCode = subjectCode;
  }

  public weekDay : string;
  public beginTime : DayTime;
  public endTime : DayTime;
  public classRoom : string;
  public subjectCode : string;
}