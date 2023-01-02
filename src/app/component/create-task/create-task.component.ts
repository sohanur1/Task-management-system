import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskManagementService } from 'src/app/services/task-management.service';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  taskForm !: FormGroup;
  newStatusOpened : boolean = false;
  fromDate!: any;
  toDate!: any;
  certainDate: Date = new Date();
  Date: Date = new Date();
  statusList : any[] = [];

  assignedPerson: any = ['Person1', 'Person2', 'Person3']

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    public fb : FormBuilder,
    private taskManagementService: TaskManagementService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getStatus();
  }

  createForm(): void{
    this.taskForm = this.fb.group({
      title : ['', [Validators.required,Validators.maxLength(100), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      description  : ['', [Validators.required,Validators.maxLength(150), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      priority: ['1', [Validators.required]],
      statusId: ['',Validators.required],
      newStatusName:  ['', Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      assignedPerson: ['',Validators.required],
      // attachment: [''],
      // subTask: ['']
      fromDate: ['',Validators.required],
      toDate: ['',Validators.required],

    });
  }

  get f(){
    return this.taskForm.controls;
  }

  onClose(){
    this.dialogRef.close();
  }

  openNewStatus(){
    this.newStatusOpened = true;

    this.taskForm.controls['newStatusName'].setValidators([Validators.required]);
    this.taskForm.controls['newStatusName'].updateValueAndValidity();

    this.taskForm.controls['statusId'].clearValidators();
    this.taskForm.controls['statusId'].updateValueAndValidity();
  }

  onCancel(){
    this.dialogRef.close();
  }

  saveTask(){
    this.dialogRef.close(this.taskForm.value);
  }

  getStatus(){
    this.statusList = this.taskManagementService.getStatus();
    console.log(this.statusList);
  }

  get fromDateFromForm(){
    return this.taskForm.get('fromDate');
    }

    get toDateFromForm(){
      return this.taskForm.get('toDate');
    }



}
