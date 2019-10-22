import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../../api.service";

@Component({
  selector: 'app-grade-update',
  templateUrl: './grade-update.component.html',
  styleUrls: ['./grade-update.component.less']
})
export class GradeUpdateComponent implements OnInit {
  @Input() grade: number;
  @Input() studentId: string;
  @Input() currentTab: string;
  oldGrade: number;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService) { }

  ngOnInit() {
    this.oldGrade = this.grade;
  }

  public updateGrade(): void {
    if(this.currentTab === 'homework')
      console.log('homework');
    else if(this.currentTab === 'test')
      console.log('test');
    this.activeModal.close('Close click');
  }
}
