import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ToDoItem } from '../todo';
import { SuperloopApiService } from '../superloop-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  toDoForm = new FormGroup ({});
  toDo: ToDoItem;
  loading: boolean = false;
  rateLimited: boolean = false;

  constructor(private superloopApiService: SuperloopApiService,
    private fb: FormBuilder,
    public router: Router) { }

    ngOnInit() {
      this.buildForm();
    }

    save() {
      if(this.toDoForm.valid) {
        this.superloopApiService.setToDo(this.toDoForm.value);
        this.router.navigate(['view']);
      }
    }

    reset() {
      this.buildForm();
    }

    buildForm() {
      this.toDoForm = this.fb.group({
        index: [{value: null, disabled:true}],
        name: [],
        description: [],
        dueDate: [],
        status: "Pending",
      });
    }

}
