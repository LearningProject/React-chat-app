import { Component, ViewChild, TemplateRef, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() showMain = new EventEmitter();
  startJourney = true;

  constructor(private router: Router) { }
  ngOnInit() {

  }

  open() {
    this.router.navigate(['/risk']);
    this.startJourney = !this.startJourney;
    this.showMain.emit(this.startJourney);
  }
  startJourneyClick() {
    this.startJourney = !this.startJourney;
  }

}
