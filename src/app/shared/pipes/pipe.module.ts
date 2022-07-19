import { NgModule } from '@angular/core';
import { PipeDateComments } from './pipe-date-comments.pipe';
import { PipeDatePtBr } from './pipe-date-ptbr.pipe';
import { PipeDate } from './pipe-date.pipe ';

@NgModule({
	declarations: [
    PipeDate,
    PipeDateComments,
    PipeDatePtBr,
  ],
  exports: [
    PipeDate,
    PipeDateComments,
    PipeDatePtBr,
  ],
})
export class PipeModule {}
