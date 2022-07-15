import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonCategory } from 'src/app/shared/models/button-category';
import { ButtonFormat } from 'src/app/shared/models/button-format';
import { ButtonSize } from 'src/app/shared/models/button-size';
import { ModalContent } from 'src/app/shared/models/modal-content';

@Component({
  selector: 'app-button-dynamic',
  templateUrl: './button-dynamic.component.html',
  styleUrls: ['./button-dynamic.component.scss']
})
export class ButtonDynamicComponent implements OnChanges {

  @Input() type: string = 'button';
  @Input() label: string | number = '';
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() tooltip: string = '';
  @Input() tooltipCloseDelay: number = 0;
  @Input() icon: string = '';
  @Input() format: ButtonFormat = { name: 'pattern' };
  @Input() category: ButtonCategory = { name: 'primary' };
  @Input() size: ButtonSize = { name: 'mid' };
  @Input() uppercase: boolean = false;
  @Input() bold: boolean = false;
  @Input() action: string = '';
  @Input() style: string = '';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() modalContent: ModalContent = { name: '', content: '' };

  @Output() buttonFunction: EventEmitter<string> = new EventEmitter<string>();
  @Output() buttonFunctionModal: EventEmitter<ModalContent> = new EventEmitter<ModalContent>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.class = `${this.format.name} ${this.category.name} ${this.size.name}`;
    }
  }

  buttonSendFunction(event: Event, disabled?: boolean): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.action && !disabled) {
      this.buttonFunction.emit(this.action);
    }
  }

  buttonClickFunctionCalendar(event: any, disabled?: boolean): void {
    if (event && !disabled) {
      event.toggle();
    }
  }

  buttonShowModal(): void {
    this.buttonFunctionModal.emit(this.modalContent);
  }
}
