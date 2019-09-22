import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'visioEdu-Portal';

  infoUser:any;

  constructor(private http: HttpClient){
    this.http.get<{query: string}>('http://ip-api.com/json')
    .subscribe( data => {
      this.infoUser = data;
      console.log(this.infoUser.city)
    });
  }

  // sidenavEvents(str) {
  //   console.log(str);
  // }
}
