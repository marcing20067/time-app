import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AbstractFormComponent } from '../abstractform.component';
import { Task } from './../models/task'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends AbstractFormComponent {
  @Output()
  newTask = new EventEmitter<Task>();
  model: Partial<Task> = {};



  daysInMonth(e: HTMLInputElement, year: number = new Date().getFullYear()) {
    setTimeout(() => {
      const model_num = this.model.month_num as number;
      const days: number = new Date(year, model_num, 0).getDate();
      this.days_of_month = [...Array(days + 1).keys()];
      this.days_of_month.shift();
      if (days < this.model.day_num) {
        console.log(this.model.day_num);
        this.model.day_num = undefined;
        console.log(this.model.day_num);
      }
    }, 1)
  }

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

  getSubmitBoolean(taskForm: NgForm) {
    let x: Boolean = true

    if (taskForm.invalid === false) {
      this.model.day_num === undefined ? x = true : x = false
    }
    return x
  }
}

