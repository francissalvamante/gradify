import { Component } from '@angular/core';
import { SpinnerService } from "./spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Grading System';

  constructor(private spinnerService: SpinnerService) { }
}
