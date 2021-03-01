import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
  .container-title {
    text-align: center;
    h1 {
      font-size: xxx-large;
    }
  }
  `]
})
export class AppComponent {
  filterValue: string;
  region: string;


}
