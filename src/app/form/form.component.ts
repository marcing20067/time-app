import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractFormComponent } from '../abstractform.component';
import { Task } from '../models/task';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends AbstractFormComponent {
  @Output()
  newTask = new EventEmitter<Task>();

  send(): void {
    this.model.done = false;
    this.model.hour = `${this.minTime} - ${this.maxTime}`;
    this.newTask.emit(this.model as Task);
    this.model = {
      content: "",
      primary_task: 0,
      hour: "",
      day_num: 0,
      month_num: 0,
      year: undefined,
      done: false
    }
    this.minTime = ''
    this.maxTime = ''
  }

}

