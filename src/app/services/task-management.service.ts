import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {

  constructor() { }

  saveTask(data:any){
    let taskData;
    let savedtask  = localStorage.getItem('task'.toString());
    if (savedtask !== null) {
      taskData = JSON.parse(savedtask);
      taskData = [...taskData, data];
    }
    else {
      taskData = [data];
    }
    localStorage.setItem('task', JSON.stringify(taskData));
  }

  getTask(): any{
    let taskData;
    let savedTaskData = localStorage.getItem('task');
    if (savedTaskData !== null) {
      taskData = JSON.parse(savedTaskData);
    }
    return taskData;
  }

  saveStatus(data:any): any{
    let statusData;
    let lastSavedId;
    let savedStatus  = localStorage.getItem('status'.toString());
    if (savedStatus !== null) {
      statusData = JSON.parse(savedStatus);
      const statusLength = statusData?.length;
      let statusModel = {
        id: statusLength + 1,
        name : data.newStatusName
      }
      lastSavedId = statusLength + 1;
      statusData = [...statusData, statusModel];
    }
    else {
      let statusModel = {
        id: 1,
        name : data.newStatusName
      }
      statusData = [statusModel];
      lastSavedId = 1;
    }
    localStorage.setItem('status', JSON.stringify(statusData));
    return lastSavedId;
  }


  getStatus():any{
    let statusData;
    let savedStatusData = localStorage.getItem('status');
    if (savedStatusData !== null) {
      statusData = JSON.parse(savedStatusData);
    }
    return statusData;
  }
}
