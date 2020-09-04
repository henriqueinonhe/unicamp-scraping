export class DayTime
{
  constructor(hour : number, minute : number)
  {
    if(!(0 <= hour && hour <= 23))
    {
      throw new Error(`Hour must be within 0 and 23, but "${hour}" was received!`);
    }

    if(!(0 <= minute && minute <= 59))
    {
      throw new Error(`Minute must be within 0 and 59, but "${minute} was received!`);
    }

    this.hour = hour;
    this.minute = minute;
  }

  public static deserialize(object : Record<string, unknown>) : DayTime
  {
    return new DayTime(object.hour as number, object.minute as number);
  }

  public static fromString(string : string) : DayTime
  {
    if(!/^\d\d:\d\d$/.test(string))
    {
      throw new Error("Invalid DayTime string format!");
    }

    const [hourString, minuteString] = string.split(":");
    return new DayTime(parseInt(hourString), parseInt(minuteString));
  }

  public getHour() : number
  {
    return this.hour;
  }

  public getMinute() : number
  {
    return this.minute;
  }

  public toString() : string
  {
    const twoDigitHour = this.hour > 9;
    const twoDigitMinute = this.minute > 9;
    const formattedHour = twoDigitHour ? `${this.hour}` : `0${this.hour}`;
    const formattedMinute = twoDigitMinute ? `${this.minute}` : `0${this.minute}`;

    return `${formattedHour}:${formattedMinute}`;
  }

  public compare(other : DayTime) : number
  {
    if(this.hour < other.hour)
    {
      return -1;
    }
    else if(this.hour > other.hour)
    {
      return 1;
    }
    else
    {
      if(this.minute < other.minute)
      {
        return -1;
      }
      else if(this.minute > other.minute)
      {
        return 1;
      }
      else
      {
        return 0;
      }
    }
  }

  private hour : number;
  private minute : number;  
}