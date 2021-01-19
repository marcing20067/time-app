import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './../models/task'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Output()
  newTask = new EventEmitter<any>()
  tasks!: Observable<Task[]>

  days_of_month = [...Array(31 + 1).keys()];
  month_of_years = [...Array(12 + 1).keys()];

  constructor() {
    this.days_of_month.shift()
    this.month_of_years.shift()
  }

  emitTask(content: string, days: string, month: string, hour: string) {
    const task: Task = {
      content: content,
      primary_task: 1,
      hour: hour,
      day_num: parseFloat(days),
      month_num: parseFloat(month),
      year: 2021,
    }
    this.newTask.emit(task)
  }


}
