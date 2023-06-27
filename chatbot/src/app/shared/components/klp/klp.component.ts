import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import { KLPService } from '../../service/klp.service';


@Component({
  selector: 'app-klp',
  templateUrl: './klp.component.html',
  styleUrls: ['./klp.component.scss'],
 
})
export class KLPComponent implements OnInit{
  @Input() risk_kpl:any; 
 data:any =[];
  background: ThemePalette ='primary' ;
  constructor(private klpService:KLPService){

  }
  ngOnInit(){
    this.klpService.selectedProduct$.subscribe((value) => {
      console.log('value is',value);
      this.data = value;
    });
    // this.data = this.klpService.getKLP();
    console.log(this.data);
  }

}
