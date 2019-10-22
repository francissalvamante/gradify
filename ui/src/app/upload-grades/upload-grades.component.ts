import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-upload-grades',
  templateUrl: './upload-grades.component.html',
  styleUrls: ['./upload-grades.component.less']
})
export class UploadGradesComponent implements OnInit {
  grades: String;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {}

  uploadGrades() {
    let data = this.grades.split('\n');
    this.apiService.uploadGrades(data).subscribe(data => {
      this.router.navigate(['students']);
    });
  }

}
