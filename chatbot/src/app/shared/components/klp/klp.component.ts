import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { KLPService } from '../../service/klp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Location } from '@angular/common';
import { NavigationEnd } from "@angular/router";


@Component({
  selector: 'app-klp',
  templateUrl: './klp.component.html',
  styleUrls: ['./klp.component.scss'],

})
export class KLPComponent implements OnInit {
  @Input() risk_kpl: any;
  data: any = [];
  background: ThemePalette = 'primary';
  injector: any;
  state$: Observable<any> | undefined;
  story: any;
  private history: string[] = [];
  messages: any[]=[];
  constructor(private klpService: KLPService, public activatedRoute: ActivatedRoute, private router: Router,private location:Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.data = params.getAll('list');
      this.story = params.getAll('story');
      this.messages= params.getAll('messages');
    });
    console.log('data is ', this.messages);


  }
  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/risk");
    }
  }

}

