import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.scss']
})
export class AlertComponentComponent { 
  isOpen = true;
  @Input() data = false;
  constructor(){

  }
  openSupportPopup() {
    this.isOpen = !this.isOpen;
  }

}
