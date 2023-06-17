import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-klp',
  templateUrl: './klp.component.html',
  styleUrls: ['./klp.component.scss']
})
export class KLPComponent {
  @Input() risk_kpl:any; 
  constructor(){

  }
  ngInit(){
    console.log(this.risk_kpl);
  }

}
