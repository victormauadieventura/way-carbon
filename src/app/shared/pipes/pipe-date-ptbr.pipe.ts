import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({ name: 'datePtBr' })
export class PipeDatePtBr implements PipeTransform {
  transform(value: string | Date | any): string {
    moment.locale('pt-br')
    return moment(value).format('DD/MM/YYYY');
  }
}
