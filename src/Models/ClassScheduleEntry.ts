import { DayTime } from "./DayTime";

export class ClassScheduleEntry
{
  constructor(weekDay : string, beginTime : DayTime, endTime : DayTime, classRoom : string)
  {
    this.weekDay = weekDay;
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.classRoom = classRoom;
  }

  public weekDay : string;
  public beginTime : DayTime;
  public endTime : DayTime;
  public classRoom : string;
}