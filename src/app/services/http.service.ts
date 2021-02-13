import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task'
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  url = 'https://marcing20067.pythonanywhere.com/tasks'

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url).pipe(map(tasks => tasks.sort((a, b) => a.done === b.done ? 0 : a.done ? 1 : -1)), tap(console.log))
  }

  addTask(task: Task):Observable<Task> {
    return this.http.post<Task>(this.url, task).pipe(tap(console.log))
  }

  editTask(task: Task):Observable<Task> {
    const id = task.id_task
    delete task.id_task
    return this.http.put<Task>(this.url + '/' + id, task).pipe(tap(console.log))
  }

  deleteTask(task_id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + '/' + task_id).pipe(tap(console.log))
  }
}
