import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FileUploader } from "ng2-file-upload";
import { ToastrService } from "ngx-toastr";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload-grades',
  templateUrl: './upload-grades.component.html',
  styleUrls: ['./upload-grades.component.less']
})
export class UploadGradesComponent implements OnInit {
  grades: String;
  public uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'image'
  });

  constructor(private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      status = JSON.parse(status);
      if(status.success) {
        this.toastr.success('File successfully uploaded');
        this.router.navigate(['students']);
      } else
        this.toastr.error('File upload error');
    }
  }

  uploadGrades() {
    let data = this.grades.split('\n');
    this.apiService.uploadGrades(data).subscribe(data => {
      this.router.navigate(['students']);
    });
  }

}
