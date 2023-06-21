import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.scss']
})
export class AlertComponentComponent { 
  isOpen = true;
  @Input() persona_data:any;
  showPersona: any;
  constructor(){
    console.log('data',this.persona_data);

  }
  ngOnInit(){
    this.showPersona = this.persona_data;
    console.log('data',this.showPersona);
  }
  openSupportPopup() {
    this.isOpen = !this.isOpen;
  }

}
