import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractFormComponent } from 'src/app/abstractform.component';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent extends AbstractFormComponent {
  
  @Output() editedTask = new EventEmitter<Task>();

  model: Task = {
    content: "",
    primary_task: 0,
    hour: "",
    day_num: 0,
    month_num: 0,
    year: 0,
    done: false
  };

  show: boolean = false;

  edit(task: Task): void {
    this.show = !this.show;
    this.model = task;
    this.minTime = this.model.hour.split('').splice(0, 5).join('');
    this.maxTime = this.model.hour.split('').splice(8, 12).join('');
    (<HTMLInputElement>document.querySelector(`#edit-day_num${this.model.day_num}`)).click();
    (<HTMLInputElement>document.querySelector(`#edit-month_num${this.model.month_num}`)).click();
    (<HTMLInputElement>document.querySelector(`#edit-primary${this.model.primary_task}`)).click();
  }

  emitEditedTask(): void {
    this.model.hour = `${this.minTime} - ${this.maxTime}`
    this.editedTask.emit(this.model as Task)
    this.show = !this.show;
  }
}
