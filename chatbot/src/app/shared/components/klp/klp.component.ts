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
  messages: any;
  riskStory: string = '';
  constructor(private klpService: KLPService, public activatedRoute: ActivatedRoute, private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      // console.log('params is',JSON.parse(this.activatedRoute.snapshot.paramMap.get('messages'))|| '{}');
      this.data = params.getAll('list');
      this.story = params.getAll('story');
      console.log('params', params.get('messages'));
      this.messages = JSON.parse(params.get('messages') || '{}');
    });
  }
  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/risk");
    }
  }
  displayStory(param: any) {
    if (param.domain === 'Financial Risk') {
      this.riskStory = 'Title of the Story "Financial Risk"\
      \n Departure from the Air Force:\
      \nOnce upon a time, in a small town, there lived a young man named Alex. He had always dreamt of serving in the Air Force, soaring through the skies with unwavering pride. At the age of 18, he enlisted in the military and embarked on an extraordinary journey.\
      \nThe Price of Sacrifice:\
      \nDuring his time in the Air Force, Alex encountered a physical injury that hindered his ability to continue serving. Despite his deep love for his country, he had to make the difficult decision to leave the military at the tender age of 21. The transition was emotionally challenging, as he had to face the reality of leaving behind the life he had always known.\
      \nA Broken Heart:\
      \nIn addition to his military departure, Alex was also going through a heart-wrenching breakup with his long-term partner, Sarah. The strain of distance and the demanding nature of military life had taken its toll on their relationship, leading to an inevitable parting of ways. The combination of leaving the Air Force and the end of a significant relationship left Alex feeling lost and uncertain about his future.\
      \nThe Struggles of Unemployment: \nFinding himself thrust into the civilian world earlier than expected, Alex faced the harsh reality of unemployment. Without a clear career path or support network, he was left grappling with feelings of purposelessness. Despite his dedication and skills acquired in the Air Force, securing a job became a daunting challenge.\
      \nLingering Shadows: \nAs time went by, Alex realized that leaving the Air Force early had left him vulnerable in unexpected ways. His access to military systems or accounts had not been properly terminated, exposing him to potential unauthorized access. Fearing the consequences of this oversight, he decided to take action and protect his privacy.\
      \nA Beacon of Hope:\nDriven by his resilience and determination, Alex sought assistance to rectify the issue. He updated his resume and online profiles, emphasizing his skills, discipline, and adaptability gained from his military experience. While navigating the treacherous waters of unemployment, he remained vigilant against phishing emails, carefully scrutinizing every communication that came his way.';
    } else {
      this.riskStory = 'Title of the Story "Personal Risk"\
      \n Departure from the Air Force:\
      \nOnce upon a time, in a small town, there lived a young man named Alex. He had always dreamt of serving in the Air Force, soaring through the skies with unwavering pride. At the age of 18, he enlisted in the military and embarked on an extraordinary journey.\
      \nThe Price of Sacrifice:\
      \nDuring his time in the Air Force, Alex encountered a physical injury that hindered his ability to continue serving. Despite his deep love for his country, he had to make the difficult decision to leave the military at the tender age of 21. The transition was emotionally challenging, as he had to face the reality of leaving behind the life he had always known.\
      \nA Broken Heart:\
      \nIn addition to his military departure, Alex was also going through a heart-wrenching breakup with his long-term partner, Sarah. The strain of distance and the demanding nature of military life had taken its toll on their relationship, leading to an inevitable parting of ways. The combination of leaving the Air Force and the end of a significant relationship left Alex feeling lost and uncertain about his future.\
      \nThe Struggles of Unemployment: \nFinding himself thrust into the civilian world earlier than expected, Alex faced the harsh reality of unemployment. Without a clear career path or support network, he was left grappling with feelings of purposelessness. Despite his dedication and skills acquired in the Air Force, securing a job became a daunting challenge.\
      \nLingering Shadows: \nAs time went by, Alex realized that leaving the Air Force early had left him vulnerable in unexpected ways. His access to military systems or accounts had not been properly terminated, exposing him to potential unauthorized access. Fearing the consequences of this oversight, he decided to take action and protect his privacy.\
      \nA Beacon of Hope:\nDriven by his resilience and determination, Alex sought assistance to rectify the issue. He updated his resume and online profiles, emphasizing his skills, discipline, and adaptability gained from his military experience. While navigating the treacherous waters of unemployment, he remained vigilant against phishing emails, carefully scrutinizing every communication that came his way.';
    }

  }

}

