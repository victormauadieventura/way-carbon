import { NgModule } from '@angular/core';
import { PipeDateComments } from './pipe-date-comments.pipe';
import { PipeDate } from './pipe-date.pipe ';

@NgModule({
	declarations: [
    PipeDate,
    PipeDateComments,
  ],
  exports: [
    PipeDate,
    PipeDateComments,
  ],
})
export class PipeModule {}
