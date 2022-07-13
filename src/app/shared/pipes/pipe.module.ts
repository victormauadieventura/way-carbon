import { NgModule } from '@angular/core';
import { PipeDate } from './pipe-date.pipe ';

@NgModule({
	declarations: [
    PipeDate,
  ],
  exports: [
    PipeDate,
  ],
})
export class PipeModule {}
