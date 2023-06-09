import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  val = 10;
  @Input() risk_severity = 0;
  constructor() { }
  ngInit() {
    console.log(this.risk_severity);
  }
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      // this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
  getPromoStyles() {

    return { width: this.risk_severity + '%' };
  }
}
