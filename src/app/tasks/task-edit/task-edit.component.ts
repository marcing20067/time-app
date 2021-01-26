import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
    year: 0,
    done: false
  };
  days_of_month: number[] = [...Array(31 + 1).keys()];
  month_of_years: number[] = [...Array(12 + 1).keys()];
  minTime: string = '';
  maxTime: string = '';
  show: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.days_of_month.shift();
    this.month_of_years.shift();
  }

  edit(task: Task): void {
    this.show = !this.show;
    this.model = task;
    this.minTime = this.model.hour.split('').splice(0, 5).join('');
    this.maxTime = this.model.hour.split('').splice(8, 12).join('');
    (<HTMLInputElement>document.querySelector(`#edit-day_num${this.model.day_num}`)).click();
    (<HTMLInputElement>document.querySelector(`#edit-month_num${this.model.month_num}`)).click();
    (<HTMLInputElement>document.querySelector(`#edit-primary${this.model.primary_task}`)).click();
  }

  emitEditedTask() {
    this.model.hour = `${this.minTime} - ${this.maxTime}`
    this.editedTask.emit(this.model as Task)
  }
}
