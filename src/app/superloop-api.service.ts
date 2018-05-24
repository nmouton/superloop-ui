import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ToDoItem } from './todo';

@Injectable({
  providedIn: 'root'
})
export class SuperloopApiService {
  private bootAppUrl = environment.apiUrl;
  private toDoListSource = new Subject<any>();

  constructor(private http: HttpClient) { }

  toDoListRx(): Observable<ToDoItem[]> {
    return this.toDoListSource.asObservable();
  }

  getToDos() {
    return this.http
      .get<ToDoItem[]>(this.bootAppUrl+'/api/todos')
      .subscribe(resp => {
        this.toDoListSource.next(resp);
      });
  }

  setToDo(toDo: ToDoItem) {
    return this.http
      .post(this.bootAppUrl+'/api/todo',toDo)
      .subscribe(resp => {
        this.toDoListSource.next(resp);
      });
  }

  updateToDo(id: string, toDo: ToDoItem) {
    return this.http
      .put(this.bootAppUrl+'/api/todo/'+id, toDo)
      .subscribe(res => {
        this.getToDos();
      });
  }

  deleteToDo(id: string) {
    return this.http
      .delete(this.bootAppUrl+'/api/todo/'+id)
      .subscribe(res => {
        this.getToDos();
      });
  }

}
