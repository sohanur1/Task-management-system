import { Component, OnInit } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskManagementService } from 'src/app/services/task-management.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import * as _ from 'lodash';
import { TaskDetailsComponent } from '../task-details/task-details.component';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskList : any[] = [];
  statusWiseTask !: any;
  taskGroups : any[][] = [];
  statusList : any[] = [];

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private taskManagementService : TaskManagementService
  ) { }

  ngOnInit(): void {
    this.getStatusList();
    this.getTask();
  }

  handleDialog():void{
    const dialogRef = this.matDialog.open(CreateTaskComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(formValue=> {
      if (!formValue) {
        return;
      }

      if(formValue?.newStatusName.trim()){
        let lastSavedId = this.taskManagementService.saveStatus(formValue);
        if(lastSavedId){
          formValue.statusId = lastSavedId;
          this.taskManagementService.saveTask(formValue);
        }

      }else{
        this.taskManagementService.saveTask(formValue);
      }

      alert('saved Successfully');
      this.getStatusList();
      this.getTask();
    });
  }

  getTask():void{
    this.taskList = this.taskManagementService.getTask();

    this.taskList.forEach((resElememt:any) => {
      let catId = resElememt?.statusId;
      let catDetails = this.statusList.find((element:any) => element.id === catId);
      resElememt.catActualName = catDetails?.name;
    });

    if(this.taskList.length > 0){

    }
    this.statusWiseTask = _.groupBy(this.taskList, "statusId");
    for (let key in this.statusWiseTask) {
      let task = [];
      let keyNumber = Number(key);
      for(let i=0; i<this.statusWiseTask[key]?.length; i++){
        task.push(this.statusWiseTask[key][i]);
      }
      this.taskGroups[keyNumber] = task;
    }

  }

  getStatusList(){
    this.statusList = this.taskManagementService.getStatus();
  }

  handleDetailsDialog(taskDetails : any){
    const dialogPosition: DialogPosition = {
      top: '50px',
      left:'700px'
    };
    const dialogRef = this.matDialog.open(TaskDetailsComponent, {
      width: '700px',
      data: taskDetails,
      position : dialogPosition
    });
  }

  // openLinkNewTab(url:any){
  //   window.open(url, "_blank");
  // }


}
