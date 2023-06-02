import { Component } from '@angular/core';
import {BaseFacade} from "@core/state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private baseFacade: BaseFacade) {
    this.baseFacade.dispatchGetUser();
  }
}
