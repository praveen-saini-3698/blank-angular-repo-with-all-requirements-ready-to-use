import { Component } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'manav-hit-samajik-sawa-sanshthan';
  constructor(public global: GlobalService) {
    this.global.navigateTo('home');
  }
}
