import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SuperloopApiService } from '../superloop-api.service';
import { Inject } from '@angular/core';
import { ToDoItem } from '../todo';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
  toDoForm = new FormGroup ({});
  status: string;

  constructor(
    private superloopApiService: SuperloopApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.buildForm(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    if(this.toDoForm.valid) {
      this.toDoForm.controls['status'].setValue("Pending");
      this.superloopApiService.setToDo(this.toDoForm.value);
      this.dialogRef.close();
    }
  }

  update(){
    if(this.toDoForm.valid) {
      this.superloopApiService.updateToDo(this.data.id, this.toDoForm.value);
      this.dialogRef.close();
    }
  }

  buildForm(data?) {
    this.toDoForm = this.fb.group({
      index: [{value: null, disabled:true}],
      name: [data.name],
      description: [data.description],
      dueDate: [data.dueDate],
      status: [data.status],
    })
  }

}
