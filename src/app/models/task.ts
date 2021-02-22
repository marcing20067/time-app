export interface Task {
    _id?: number;
    content: string;
    primary_task: number;
    hour: string;
    day_num: any;
    month_num: number;
    year: number;
    done: boolean;
}
