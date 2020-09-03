export class ClassScheduleEntry
{
  constructor(weekDay : string, beginTime : string, endTime : string, classRoom : string)
  {
    this.weekDay = weekDay;
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.classRoom = classRoom;
  }

  public weekDay : string;
  public beginTime : string;
  public endTime : string;
  public classRoom : string;
}