import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {

  months = [
    'Jan', 'Fev', 'Mar',
    'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set',
    'Out', 'Nov', 'Dez'
  ];


  transform(value: Date, withTime = false) {
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();

    let time = '';

    if (withTime) {
      const hour = this.lpad(value.getHours());
      const minutes = this.lpad(value.getMinutes());
      time = ` às ${hour}:${minutes}`;
    }

   return `${this.lpad(day)} ${this.months[month - 1]} ${year}${time}`;
  }

  private lpad(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

}