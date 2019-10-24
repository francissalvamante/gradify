import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2TableModule } from "ngx-datatable/ng2-table";
import { ToastrModule } from "ngx-toastr";
import { FileSelectDirective } from "ng2-file-upload";
import { MatProgressBar } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadGradesComponent } from './upload-grades/upload-grades.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PaginationModule } from "ngx-bootstrap";
import { StudentGradeComponent } from './students-list/student-grade/student-grade.component';
import { GradeUpdateComponent } from './students-list/student-grade/grade-update/grade-update.component';
import {CustomHttpInterceptor} from "./http-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    UploadGradesComponent,
    StudentsListComponent,
    HomeComponent,
    ProfileComponent,
    StudentGradeComponent,
    GradeUpdateComponent,
    FileSelectDirective,
    MatProgressBar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  entryComponents: [
    GradeUpdateComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
