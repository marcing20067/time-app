import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskboxComponent } from './tasks/taskbox/taskbox.component';
import { FormsModule } from '@angular/forms';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TasksComponent,
    TaskboxComponent,
    TaskEditComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
