import { NgForm } from '@angular/forms';
import { Task } from './models/task';

export abstract class AbstractFormComponent {
    model: Partial<Task> = {};
    minTime: string = '';
    maxTime: string = '';
    days_of_month: number[] = [...Array(31 + 1).keys()];
    month_of_years: number[] = [...Array(12 + 1).keys()];

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

    getSubmitBoolean(form: NgForm) {
        let x: Boolean = true

        if (form.invalid === false && this.minTime !== this.maxTime) {
            this.model.day_num === undefined ? x = true : x = false
        }
        return x
    }

    constructor() {
        this.days_of_month.shift();
        this.month_of_years.shift();
    }
}
