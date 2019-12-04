import { Component, OnInit } from '@angular/core';
import { WebService } from './app.services';

// Creating Model for the required responce
interface KafkaModel {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sharePrice = '35';
  constructor(private webServices: WebService) { }

  ngOnInit(): void {
    this.webServices.listener('test event').subscribe((data: KafkaModel) => {
      console.log(data);
      this.sharePrice = data.message;
    });
  }

}
