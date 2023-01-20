import { Component } from '@angular/core';
import { Cs63Service } from './service/cs63.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-app';
  constructor(public cs63: Cs63Service){

  }
}
