import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.scss']
})
export class AlertComponentComponent { 
  isOpen = true;
  @Input() persona_data:any;
  constructor(){
    console.log('data',this.persona_data);

  }
  ngInit(){
    console.log('data',this.persona_data);
  }
  openSupportPopup() {
    this.isOpen = !this.isOpen;
  }

}
