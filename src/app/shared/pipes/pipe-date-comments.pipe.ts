import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({ name: 'dateComments' })
export class PipeDateComments implements PipeTransform {
  transform(value: string | Date | any): string {
    moment.locale('pt-br')
    return moment(value).format('DD MMM YYYY, [às] hh[h]mm');
  }
}
