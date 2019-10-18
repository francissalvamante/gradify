import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadGradesComponent } from './upload-grades/upload-grades.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { ProfileComponent } from "./profile/profile.component";


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'upload', component: UploadGradesComponent },
	{ path: 'grades', component: GradesListComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
