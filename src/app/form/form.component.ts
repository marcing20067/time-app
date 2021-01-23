import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from './../models/task'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Output()
  newTask = new EventEmitter<Task>();
  tasks!: Observable<Task[]>;
  primary: any;
  days_of_month: number[] = [...Array(31 + 1).keys()];
  month_of_years: number[] = [...Array(12 + 1).keys()];
  model: Partial<Task> = {};
  minTime: string = '';
  maxTime: string = '';
  constructor() {
    this.days_of_month.shift();
    this.month_of_years.shift();
  }

  send(): void {
    this.model.hour = `${this.minTime} - ${this.maxTime}`;
    console.log(this.model);
    console.log(this.model as Task); 
    this.newTask.emit(this.model as Task);
  }
}

