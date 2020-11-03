import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCalculator',
})
export class DateCalculatorPipe implements PipeTransform {
  transform(value: any): number {
    let today: Date = new Date();
    let todayWithoutTime: any = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    var dateDiff = Math.abs(value - todayWithoutTime);
    const secondsInADay = 60 * 60 * 24;
    var dateDiffInSeconds = dateDiff * 0.001;
    var dateCounter = Math.trunc(dateDiffInSeconds / secondsInADay);
    if (dateCounter >= 1 && value > todayWithoutTime) return dateCounter;
    else return 0;
  }
}
