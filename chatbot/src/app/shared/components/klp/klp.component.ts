import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { KLPService } from '../../service/klp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';


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
  constructor(private klpService: KLPService, public activatedRoute: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.data = params.getAll('list');
      this.story = params.getAll('story')
    });
    console.log('data is ', this.data);


  }

}

