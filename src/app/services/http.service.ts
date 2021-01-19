import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:5000/tasks'

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url)
  }

  addTask(task: Task):Observable<Task> {
    return this.http.post<Task>(this.url, task)
  }

  editTask(task: Task):Observable<Task> {
    return this.http.put<Task>(this.url + '/' + task.id_task, task)
  }

  deleteTask(task_id: number):Observable<{}> {
    return this.http.delete<{}>(this.url + '/' + task_id)
  }
}
