import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({ name: 'date' })
export class PipeDate implements PipeTransform {
  transform(value: string | Date | any): string {
    moment.locale('pt-br')
    return moment(value).format('DD [de] MMM, YYYY');
  }
}
