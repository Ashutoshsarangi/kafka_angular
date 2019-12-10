import { Component, OnInit } from '@angular/core';
import { WebService } from './app.services';

// Creating Model for the required responce
interface KafkaModel {
  share: string;
  sharePrice: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sharePrice = '35';
  share = 'placeholder';
  storageArray = [];
  flag = false;
  constructor(private webServices: WebService) { }

  ngOnInit(): void {
    this.webServices.listener('test event').subscribe((data: KafkaModel) => {
      const temp = [];
      let flag = false;
      // console.log(data);
      this.storageArray = this.webServices.getLocalStorage('shareData');
      if (this.storageArray) {
        // console.log(this.storageArray);
        this.storageArray.forEach((value, index) => {
          if (value.share === data.share) {
            flag = true;
            if (value.sharePrice !== data.sharePrice) {
              console.log('Price Changed');
              this.storageArray[index].sharePrice = data.sharePrice;
            }
          }
        });
        if (!flag) {
          // flag = false;
          this.storageArray.push(data);
        }
        this.webServices.setLocalStorage('shareData', this.storageArray);
      } else {
        temp.push(data);
        this.webServices.setLocalStorage('shareData', temp);
      }
      this.share = data.share;
      this.sharePrice = data.sharePrice;
    });
  }

}
