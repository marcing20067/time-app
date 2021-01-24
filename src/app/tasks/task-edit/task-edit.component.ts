import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Subject } from "rxjs"

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  @Output() editedTask = new EventEmitter<Task>();
  model: Task = {
    content: "",
    primary_task: 0,
    hour: "",
    day_num: 0,
    month_num: 0,
    year: 0
  };
  days_of_month: number[] = [...Array(31 + 1).keys()];
  month_of_years: number[] = [...Array(12 + 1).keys()];
  minTime: string = '';
  maxTime: string = '';
  show: boolean = false;
  constructor() { }
  ngOnInit(): void {
  }

  edit(task: Task): void {
    this.show = !this.show;
    this.model = task;
  }
  
  emitEditedTask() {
    this.editedTask.emit(this.model as Task)
  }
}
