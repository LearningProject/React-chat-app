import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-risk-klp',
  templateUrl: './risk-klp.component.html',
  styleUrls: ['./risk-klp.component.scss']
})
export class RiskKlpComponent {
  @Input() dataList: any;
  data: any = [];

  story: any;
  private history: string[] = [];
  messages: any;
  riskStory: string = '';
  constructor() {
    
  }
  ngOnInit() {
   
  }

  displayStory(param: any) {
   

  }

}
