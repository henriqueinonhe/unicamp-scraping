import chalk from "chalk";

export function formatTimeInterval(seconds : number, nanoseconds : number) : string
{
  const nanosecondsInMiliseconds = 1e6;
  const secondsInMinute = 60;
  
  const formattedMinutes = Math.floor(seconds / secondsInMinute);
  const formattedSeconds = seconds % secondsInMinute;
  const formattedMilliseconds = Math.floor(nanoseconds / nanosecondsInMiliseconds);

  return chalk.greenBright`${formattedMinutes} minutes, ${formattedSeconds} seconds, ${formattedMilliseconds} milliseconds`;
}

export function startTimer() : [number, number]
{
  return process.hrtime();
}

export function endTimer(timer : [number, number], message : string) : void
{
  const timeInterval = process.hrtime(timer);
  console.log(`${message} ${formatTimeInterval(timeInterval[0], timeInterval[1])}`);
}

export function printProgressBar(current : number, total : number) : void
{
  const percentage = Math.floor(100 * current / total);
  const barLength = 20;
  const barFillLength = Math.floor(percentage / (100 / barLength));

  process.stdout.write(chalk.blueBright`[${"=".repeat(barFillLength)}${" ".repeat(barLength - barFillLength)}] ${percentage}%`);
}