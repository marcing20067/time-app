export abstract class AbstractFormComponent {
    minTime: string = '';
    maxTime: string = '';
    days_of_month: number[] = [...Array(31 + 1).keys()];
    month_of_years: number[] = [...Array(12 + 1).keys()];

    constructor() {
        this.days_of_month.shift();
        this.month_of_years.shift();
    }
}
