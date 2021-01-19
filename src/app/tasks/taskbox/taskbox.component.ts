import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-taskbox',
  templateUrl: './taskbox.component.html',
  styleUrls: ['./taskbox.component.scss']
})
export class TaskboxComponent {

  @Input() tasks!: Observable<Task[]>;
  @Input() title!: string;
  

}
