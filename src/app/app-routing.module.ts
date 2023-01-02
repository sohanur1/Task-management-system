import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './component/task-list/task-list.component';

const routes: Routes = [
  {path : "task-management" , component : TaskListComponent},
  {path : "", redirectTo: "task-management" , pathMatch : "full"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
