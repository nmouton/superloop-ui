import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../todo';
import { Subscription } from 'rxjs';
import { SuperloopApiService } from '../superloop-api.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import * as _ from "lodash";

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
    //unpack the HashMap array with a few lodash streams
    const stripObjectNames = _.values(response);
    //map the results
    const result = _.transform(stripObjectNames, function(result, values, keys) {
      _.map(values, function (value, key) {
        _.set(result, key + '.id', key);
        _.set(result, key + '.name', value.name);
        _.set(result, key + '.description', value.description);
        _.set(result, key + '.dueDate', value.dueDate);
        _.set(result, key + '.status', value.status);
      })
    });
    //flatten the result into a list of ToDoItem objects
    const flatten = _.values(result);
    //load up the angular material table directives
    this.dataSource = new MatTableDataSource(flatten);
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

  ngOnInit() {
    this.superloopApiService.getToDos();
  }

}
