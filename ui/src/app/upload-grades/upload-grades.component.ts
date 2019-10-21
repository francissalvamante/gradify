import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-upload-grades',
  templateUrl: './upload-grades.component.html',
  styleUrls: ['./upload-grades.component.less']
})
export class UploadGradesComponent implements OnInit {
  grades: String;

  constructor(private apiService: ApiService) { }

  ngOnInit() {}

  uploadGrades() {
    let data = this.grades.split('\n');
    this.apiService.uploadGrades(data).subscribe(data => {
      console.log('data', data);
    });
  }

}
