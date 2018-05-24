import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SuperloopApiService } from './superloop-api.service';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './not-found.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    PageNotFoundComponent,
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    AppRoutingModule
  ],
  entryComponents: [
    AddDialogComponent
  ],
  providers: [SuperloopApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
