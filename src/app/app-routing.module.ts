import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/view', pathMatch: 'full'},
  { path: 'view', component: TodoListComponent },
  { path: 'add', component: TodoFormComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
