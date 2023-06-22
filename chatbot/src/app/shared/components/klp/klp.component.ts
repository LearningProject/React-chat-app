import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-klp',
  templateUrl: './klp.component.html',
  styleUrls: ['./klp.component.scss'],
 
})
export class KLPComponent {
  @Input() risk_kpl:any; 
  background: ThemePalette ='primary' ;
  constructor(){

  }
  ngInit(){
    console.log(this.risk_kpl);
  }

}
