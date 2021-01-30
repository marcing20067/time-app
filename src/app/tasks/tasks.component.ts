import { Component } from '@angular/core';
import { HttpService } from './../services/http.service'
import { Task } from './../models/task'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  tasks!: Observable<Task[]>;
  primary1Task!: Observable<Task[]>;
  primary2Task!: Observable<Task[]>;
  primary3Task!: Observable<Task[]>;

  constructor(private http: HttpService) { 
    this.getTablesTasks()
  }

  getTablesTasks(): void {
    this.tasks = this.http.getTasks()
    this.primary1Task = this.tasks.pipe(map(mapTasks => mapTasks.filter(item => item.primary_task === 1)))
    this.primary2Task = this.tasks.pipe(map(mapTasks => mapTasks.filter(item => item.primary_task === 2)))
    this.primary3Task = this.tasks.pipe(map(mapTasks => mapTasks.filter(item => item.primary_task === 3)))
  }

  addTask(newTask: Task): void {
    console.log(newTask);
    this.http.addTask(newTask).subscribe(
      (res)=>{ console.log(res)},
      (err)=>{ console.log(err) },
      ()=>{ this.getTablesTasks() }
    )
  }

  editTaskssss(editedTask: Task): void {
    this.http.editTask(editedTask).subscribe(
      (res)=>{ console.log(res)},
      (err)=>{ console.log(err) },
      ()=>{ this.getTablesTasks() }
    )
  }

  completeTask(completeTask: Task): void {
    completeTask.done = !completeTask.done
    this.http.editTask(completeTask).subscribe(
      (res)=>{ console.log(res)},
      (err)=>{ console.log(err) },
      ()=>{ this.getTablesTasks() }
    )
  }

  deleteTask(id: number): void{
    this.http.deleteTask(id).subscribe(
      (res)=>{ console.log(res)},
      (err)=>{ console.log(err) },
      ()=>{ this.getTablesTasks() }
    )
  }
}
