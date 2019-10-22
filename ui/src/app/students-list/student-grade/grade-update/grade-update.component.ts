import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../../api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-grade-update',
  templateUrl: './grade-update.component.html',
  styleUrls: ['./grade-update.component.less']
})
export class GradeUpdateComponent implements OnInit {
  @Input() grade: number;
  @Input() studentId: string;
  @Input() currentTab: string;
  @Input() _id: string;
  oldGrade: number;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.oldGrade = this.grade;
  }

  public async updateGrade(): Promise<void> {
    if(this.currentTab === 'homework')
      await this.apiService.updateGrade(this.grade, this.studentId, this.currentTab, this._id).subscribe((response) => {
        this.activeModal.close('updated');
      });
    else if(this.currentTab === 'test')
      await this.apiService.updateGrade(this.grade, this.studentId, this.currentTab, this._id).subscribe((response) => {
        this.activeModal.close('updated');
      });
  }
}
