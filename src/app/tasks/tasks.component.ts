import { Component, OnInit } from '@angular/core';
import { HttpService } from './../services/http.service'
import { Task } from './../models/task'
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks!: Observable<Task[]>;
  primary1Task!: Observable<Task[]>;
  primary2Task!: Observable<Task[]>;
  primary3Task!: Observable<Task[]>;
  constructor(private http: HttpService) { }
  ngOnInit() {
    this.tasks = this.http.getTasks().subscribe(
      (res)=>{ return res},
      (err)=>{ console.log("error") },
      ()=>{ console.log("end stream")}
      )
    this.primary1Task = this.tasks.pipe(map(mapTasks => mapTasks.filter(item => item.primary_task === 1)))
    this.primary2Task = this.tasks.pipe(map(mapTasks => mapTasks.filter(item => item.primary_task === 2)))
    this.primary3Task = this.tasks.pipe(map(mapTasks => mapTasks.filter(item => item.primary_task === 3)))
  }

  addTask(newTask: Task) {
    console.log(newTask);
    this.http.addTask(newTask).subscribe(
      result => console.log(result),
      error => console.log(error)
    )
  }

  editTaskssss(editedTask: Task): void {
    this.http.editTask(editedTask).subscribe()
  }

  completeTask(completeTask: Task): void {
    completeTask.done = !completeTask.done
    this.http.editTask(completeTask).subscribe()
  }

  deleteTask(id: number) {
    this.http.deleteTask(id).subscribe()
  }
}
