import { Component, OnInit } from '@angular/core';
import { WebService } from './app.services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App';
  constructor(private webServices: WebService) { }

  ngOnInit(): void {
    console.log('init the App component');
    this.webServices.listener('test event').subscribe(data => {
      console.log(data);
      this.title = data.message;
    });
  }

}
