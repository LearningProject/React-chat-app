
import { ChangeDetectorRef, Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDragExit,
} from '@angular/cdk/drag-drop';
import { NavigationExtras, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import riskListJson from '../../Json/riskList.json';
import riskKLPList from '../../Json/riskKLP.List.json';

export interface Message {
  type: string;
  message: string;
  domain?: string;
  id?: number;
}
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
  domain?: string;
  klp: string;
}
export interface Riskdata {
  "Financial Risk-(FR)": string[];
  "Personal Risk-(PR)": string[];
  "CyberSecurity Risk -(CsR)": string[];
  "Social Risk-(SR)": string[];
  "Mental Risk-(MR)": string[];
}


@Component({
  selector: 'app-risk-menu',
  templateUrl: './risk-menu.component.html',
  styleUrls: ['./risk-menu.component.scss']
})
export class RiskMenuComponent {
  private riskData = riskListJson as Riskdata;
  klpAssociation = riskKLPList;
  @ViewChild('scrollMe') private myScrollContainer: any;
  loading = false;
  messages: Message[] = [];
  story: Message[] = [];
  msg: any;
  val = 20;
  severity: number = 0;
  startJourney = true;
  severityMsg: string = '';
  klpList: string[] = [];
  openStory = false;
  closePersona = false;
  showtyping = false;
  data = [];
  length: number = 0;
  disabled = true;
  showDialog = false;
  count = 0;
  favoriteSeason: string = '';
  transtion: string[] = ['Relationship Breakdown', 'Leaving Armed Force', 'Serious Illness', 'LGBTQ+'];
  riskTag: any;
  openRiskPlayground = false;
  openKLP = false;
  private isDisabled = false;
  panelOpenState = false;
  task: Task = {
    name: '',
    completed: false,
    color: undefined,
    klp: ''
  };
  domainRisks: string[] = [];
  keys: any = [];

  klpDetail = 'Title of the Story "Resilient Wings"\
  \n Departure from the Air Force:\
  \nOnce upon a time, in a small town, there lived a young man named Alex. He had always dreamt of serving in the Air Force, soaring through the skies with unwavering pride. At the age of 18, he enlisted in the military and embarked on an extraordinary journey.\
  \nThe Price of Sacrifice:\
  \nDuring his time in the Air Force, Alex encountered a physical injury that hindered his ability to continue serving. Despite his deep love for his country, he had to make the difficult decision to leave the military at the tender age of 21. The transition was emotionally challenging, as he had to face the reality of leaving behind the life he had always known.\
  \nA Broken Heart:\
  \nIn addition to his military departure, Alex was also going through a heart-wrenching breakup with his long-term partner, Sarah. The strain of distance and the demanding nature of military life had taken its toll on their relationship, leading to an inevitable parting of ways. The combination of leaving the Air Force and the end of a significant relationship left Alex feeling lost and uncertain about his future.\
  \nThe Struggles of Unemployment: \nFinding himself thrust into the civilian world earlier than expected, Alex faced the harsh reality of unemployment. Without a clear career path or support network, he was left grappling with feelings of purposelessness. Despite his dedication and skills acquired in the Air Force, securing a job became a daunting challenge.\
  \nLingering Shadows: \nAs time went by, Alex realized that leaving the Air Force early had left him vulnerable in unexpected ways. His access to military systems or accounts had not been properly terminated, exposing him to potential unauthorized access. Fearing the consequences of this oversight, he decided to take action and protect his privacy.\
  \nA Beacon of Hope:\nDriven by his resilience and determination, Alex sought assistance to rectify the issue. He updated his resume and online profiles, emphasizing his skills, discipline, and adaptability gained from his military experience. While navigating the treacherous waters of unemployment, he remained vigilant against phishing emails, carefully scrutinizing every communication that came his way.';

  story2 = '"Fragile Trust: Guarding the Embers of Identity" follows the story of Sergeant Emily Thompson, a dedicated servicemember transitioning out of the armed forces.\
  As she adjusts to civilian life, she receives alarming news of a potential breach of personal identifiable information (PII) stored within military databases. Fueled by concern for her fellow servicemembers, \
  Sergeant Thompson embarks on a quest to understand the extent of the breach. Collaborating with cybersecurity experts and fellow veterans, she unveils the true scope of the data breach, revealing that sensitive PII is at risk of unauthorized access. \
  Determined to protect her comrades-in-arms, Sergeant Thompson becomes an advocate for enhanced information security measures. Her efforts lead to the implementation of robust safeguards within the military, empowering servicemembers to protect their identities. Through her resilience, Sergeant Thompson not only rebuilds trust in the military ability to safeguard PII \
  but also becomes a guiding light for others, ensuring the sanctity of their identities and preserving the trust bestowed upon military institutions.'
  toppings = new FormControl('');
  toppingList: string[] = ['Relationship Breakdown', 'Leaving Armed Force', 'Serious Illness', 'LGBTQ+'];
  selected: boolean = false;
  step = -1;
  Questions: string[] = ['Do you want al-carte based risks?', 'Do you want to go with persona based risks?'];

  constructor(private router: Router) {
    let obj: any = this.riskData;
    for (const key in obj) {
      if (obj[key]) {
        this.domainRisks.push(key);
      }
    }
  }

  ngOnInit() { }

  getKeyRisk(index: any): any {
    let obj: any = this.riskData[index as keyof typeof this.riskData];
    this.keys = obj;
  }

  getId(header: string, i: number) {
    return header.split('(')[1].split(')')[0] + i;
  }


  callRiskStory(event: CdkDragDrop<string[]>) {
    event.container.data.forEach((data, i) => {
      if (data) {
        this.messages.push({ type: 'user', message: data, domain: this.riskTag });
        this.severityMsg = data;
      }

    })

    // important logic 
    // this.showtyping = true;
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     this.messages.push({
    //       type: 'client',
    //       message: this.klpDetail,
    //     })
    //     resolve('1'); // pass values
    //   }, 500);
    // });
    // imp logic ends
  }

  /** Function that push risk in playground area */
  drag(exited: CdkDragExit<any>, item: any) {
    const risk = exited?.item?.element?.nativeElement.innerText;
    const klpList = this.klpAssociation;
    setTimeout(() => {
      this.messages.push({ type: 'user', message: exited?.item?.element?.nativeElement.innerText, domain: item });
      this.severityMsg = exited.item.element.nativeElement.innerText;
      this.disabled = false;
      this.severity = this.severity + 30;
      this.count = this.count + 1;
      exited.item.element.nativeElement.classList.add('selectedMenu');
      klpList.forEach((key) => {
        if (key.risk === risk) {
          this.klpList.push(key.klp);

        }
      })
    }
      , 600);

  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

  refresh() {
    window.location.reload()
  }

  getRisk(event: any) {
    this.task = event;
    this.showDialog = true;
    this.openStory = true;
    this.closePersona = true;
  }
  open() {
    this.startJourney = false;
  }

  openRisk(event: any) {
    this.startJourney = event;
  }

  getPersona(data: any) {
    this.data = data;
  }

  submitRisk() {
    this.openKLP = true;
    this.length = this.messages.length * 50;
    this.disabled = true;
    this.showTyping().then(val => {
      this.showtyping = false;
    })

  }
  highlightStory(event: any) {
    console.log('event is ', event);
    var risks = document.getElementsByClassName("user");
    for (var i = 0; i < risks.length; i++) {
      if (i == event - 1) {
        risks[i].classList.add('highlight');
      }
    }
  }

  removeHighlightedStory(event: any) {
    var risks = document.getElementsByClassName("user");
    for (var i = 0; i < risks.length; i++) {
      if (i == event - 1) {
        risks[i].classList.remove('highlight');
      }
    }
  }

  showTyping() {
    // important logic 
    this.showtyping = true;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.story.push({
          type: 'client',
          message: this.klpDetail,
          id: 1
        });
        this.story.push({
          type: 'client',
          message: this.story2,
          id: 2
        });
        resolve('1'); // pass values
      }, 2000);
    });
    // imp logic ends
  }

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  navigateWithState() {
    const queryParams: any = {};
    queryParams.list = this.klpList;
    queryParams.story = this.klpDetail;
    queryParams.messages = JSON.stringify(this.messages);
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/klp`], navigationExtras));
    window.open(url, '_blank');
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  submitDialog() {
    this.task.subtasks?.forEach((t, j) => {
      if (t.completed === true) {
        const [riskDomainKey, index] = this.findKeyByValue(this.riskData, t.name);
        this.count = this.count + 1;
        this.messages.push({ type: 'user', message: t.name, domain: t.domain });
        document.getElementById(riskDomainKey.toString().split('(')[1].split(')')[0] + index)?.classList.add('personaRisk');
        this.klpList.push(t.klp);
      }

    })
    if (this.messages.length) {
      this.closePersona = true;
      this.openRiskPlayground = true;
      this.openStory = true;
      this.showDialog = false;
      this.disabled = false;
    } else {
      this.selected = true;
    }
  }

  findKeyByValue(obj: any, value: string) {
    for (const key in obj) {
      if (obj[key] && (obj[key].includes(value))) {
        const index: number = obj[key].indexOf(value);
        return [key, index];
      }
    }
    return ""
  }

  openDomainStory(risk: string) {
    const msg = '"Fragile Trust: Guarding the Embers of Identity" follows the story of Sergeant Emily Thompson, a dedicated servicemember transitioning out of the armed forces.\
     As she adjusts to civilian life, she receives alarming news of a potential breach of personal identifiable information (PII) stored within military databases. Fueled by concern for her fellow servicemembers, \
     Sergeant Thompson embarks on a quest to understand the extent of the breach. Collaborating with cybersecurity experts and fellow veterans, she unveils the true scope of the data breach, revealing that sensitive PII is at risk of unauthorized access. \
     Determined to protect her comrades-in-arms, Sergeant Thompson becomes an advocate for enhanced information security measures. Her efforts lead to the implementation of robust safeguards within the military, empowering servicemembers to protect their identities. Through her resilience, Sergeant Thompson not only rebuilds trust in the military ability to safeguard PII \
     but also becomes a guiding light for others, ensuring the sanctity of their identities and preserving the trust bestowed upon military institutions.'
    //this.messages.push({ type: 'client', message: msg });
    this.story.push({ type: 'client', message: msg });
  }

  generateRiskWindow(i: number) {
    this.step = i;
  }

  showMessage(msg: string) {
    if (msg === 'Yes' || msg === 'yes' || msg === 'No' || msg === 'no') {
      return false;
    }
    return true;
  }
}
