import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";
import { Student } from "../students-list.component";
import { NgbModal, NgbTabChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { GradeUpdateComponent } from "./grade-update/grade-update.component";

interface Homework {
  grade: number;
  quarter: string;
  year: string;
  studentId: string;
}

interface Test {
  grade: number;
  quarter: string;
  year: string;
  studentId: string;
}

interface Average {
  average: number;
  quarter: string;
  year: string;
  studentId: string;
}

interface StudentGradeResponse {
  status: boolean;
  data: Student;
  homework: Homework[],
  test: Test[],
  average: Average[]
}

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.less']
})
export class StudentGradeComponent implements OnInit {
  id: string;
  name: string;
  currentTab: string;
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Quarter', name: 'quarter', sort: 'desc'},
    {title: 'Year', name: 'year', sort: 'desc'},
    {title: 'Average', name: 'average'}
  ];
  public averageColumns: Array<any> = [
    {title: 'Quarter', name: 'quarter', sort: 'desc'},
    {title: 'Year', name: 'year', sort: 'desc'},
    {title: 'Average', name: 'average'}
  ];
  public homeworkColumns:Array<any> = [
    {title: 'Quarter', name: 'quarter', sort: 'desc'},
    {title: 'Year', name: 'year', sort: 'desc'},
    {title: 'Grade', name: 'grade'}
  ];
  public testColumns:Array<any> = [
    {title: 'Quarter', name: 'quarter', sort: 'desc'},
    {title: 'Year', name: 'year', sort: 'desc'},
    {title: 'Grade', name: 'grade'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any>;
  private homework:Array<any>;
  private test:Array<any>;
  private average:Array<any>;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private modalService: NgbModal) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.init();
  }

  ngOnInit() {}

  private init() {
    this.apiService.getStudentGrade(this.id).subscribe((response: StudentGradeResponse) => {
      this.name = response.data.firstName + ' ' + response.data.lastName;
      this.currentTab = !this.currentTab ? 'average' : this.currentTab;
      this.data = response[this.currentTab];
      this.average = response.average;
      this.homework = response.homework;
      this.test = response.test;

      this.onChangeTable(this.config);
    });
  }

  public onTabChange($event: NgbTabChangeEvent) {
    if($event.nextId === 'average') {
      this.columns = this.averageColumns;
      this.config.sorting = this.averageColumns;
      this.data = this.average;
    }
    else if($event.nextId === 'homework') {
      this.columns = this.homeworkColumns;
      this.config.sorting = this.homeworkColumns;
      this.data = this.homework;
    }
    else if($event.nextId === 'test') {
      this.columns = this.testColumns;
      this.config.sorting = this.testColumns;
      this.data = this.test;
    }

    this.currentTab = $event.nextId;
    this.init();
    this.onChangeTable(this.config);
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    console.log('filtered', filteredData);
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    const modalRef = this.modalService.open(GradeUpdateComponent);
    modalRef.componentInstance.grade = data.row.grade;
    modalRef.componentInstance.studentId = data.row.studentId;
    modalRef.componentInstance.currentTab = this.currentTab;
    modalRef.componentInstance._id = data.row._id;

    modalRef.result.then((response) => {
      if(response === 'updated') {
        this.onTabChange({
          activeId: this.currentTab,
          nextId: 'average',
          preventDefault: () => {}
        });
        this.init();
      }
    })
  }
}
