import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../todo';
import { Subscription } from 'rxjs';
import { SuperloopApiService } from '../superloop-api.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import * as _ from "lodash";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  toDoListSub: Subscription;
  loading: boolean = false;
  toDoItems: ToDoItem[];
  displayedColumns = ['name', 'description', 'dueDate', 'status', 'addRemove', 'delete'];
  dataSource: MatTableDataSource<any>;
  status: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private superloopApiService: SuperloopApiService,
  public dialog: MatDialog) {
    this.toDoListSub = this.superloopApiService.toDoListRx()
      .subscribe(response => {
        if(response){
          this.loadPage(response)
        }
      });
  }

  loadPage(response){
    //unpack the flat map
    const result = _.transform(response, function(result, value: ToDoItem, key) {
        _.set(result, key + '.id', key);
        _.set(result, key + '.name', value.name);
        _.set(result, key + '.description', value.description);
        _.set(result, key + '.dueDate', value.dueDate);
        _.set(result, key + '.status', value.status);
      });
    //flatten the result into an array
    const flatArray = _.values(result);
    //load up the angular material table directives
    this.dataSource = new MatTableDataSource(flatArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      height: '300px',
      width: '600px',
      data: {}
    });
  }

  deleteTodo(id: string){
    this.superloopApiService.deleteToDo(id);
  }

  edit(id, name, description, status, dueDate){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      height: '350px',
      width: '600px',
      data: {id, name, description, status, dueDate}
    });
  }

  filter(){
    if(this.status == "None") {
      this.superloopApiService.getToDos();
    } else {
      this.superloopApiService.filterToDosByStatus(this.status);
    }
  }

  ngOnInit() {
    this.superloopApiService.getToDos();
  }

}
