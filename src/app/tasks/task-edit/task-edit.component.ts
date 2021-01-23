import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { BehaviorSubject } from "rxjs"

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  @Output()
  editedTask = new EventEmitter<Task>();
  model = new BehaviorSubject<Partial<Task>>({});
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
    this.model.next(task)
  }

  emitEditedTask() {
    // let taskToEmit = {}; 
    // this.model.pipe(model => taskToEmit = model)
    // this.editedTask.emit(taskToEmit)
  }
  // @Output()
  // editedTask = new EventEmitter<Task>();
  // model!: Task;
  // modelObs = new BehaviorSubject<Partial<Task>>({});
  // days_of_month: number[] = [...Array(31 + 1).keys()];
  // month_of_years: number[] = [...Array(12 + 1).keys()];
  // minTime: string = '';
  // maxTime: string = '';
  // show: boolean = false;
  // constructor() { }
  // ngOnInit(): void {
  // }

  // edit(task: Task): void {
  //   this.show = !this.show;
  //   this.modelObs.next(task)
  //   this.modelObs.subscribe(r => this.model = r as Task)
  // }

  // emitEditedTask() {
  //   // let taskToEmit = {}; 
  //   // this.model.pipe(model => taskToEmit = model)
  //   // this.editedTask.emit(taskToEmit)
  // }
}
