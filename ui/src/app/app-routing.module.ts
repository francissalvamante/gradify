import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadGradesComponent } from './upload-grades/upload-grades.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { ProfileComponent } from "./profile/profile.component";
import { StudentGradeComponent } from "./students-list/student-grade/student-grade.component";


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'upload', component: UploadGradesComponent },
	{ path: 'students', component: StudentsListComponent },
  { path: 'students/:id/grades', component: StudentGradeComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
