
import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  CdkDragExit,
} from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MessageService } from '../../service/message.service';
import { MatDialog } from '@angular/material/dialog';
import { KLPService } from '../../service/klp.service';
import { NavigationExtras, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
export interface Message {
  type: string;
  message: string;
  domain?:string;
}
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
  domain?:string;
}
@Component({
  selector: 'app-risk-menu',
  templateUrl: './risk-menu.component.html',
  styleUrls: ['./risk-menu.component.scss']
})
export class RiskMenuComponent {
  @ViewChild('scrollMe') private myScrollContainer: any;
  loading = false;
  messages: Message[] = [];
  security: Message[] = [];
  Prisk: Message[] = [];
  Crisk: Message[] = [];
  Klearning: Message[] = [];
  msg: any;
  val = 20;
  severity: number = 0;
  startJourney = true;
  severityMsg: string = '';

  klpList: string[] = [];
  openStory = false;
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  showtyping = false;
  data = [];
  length: number = 0;
  disabled = true;
  showDialog= false;
  count = 0;
  favoriteSeason: string = '';
  transtion: string[] = ['Relationship Breakdown', 'Leaving Armed Force', 'Serious Illness', 'LGBTQ+'];
  riskTag: any;
 // domain:string='';
  
  

  constructor(private messageService: MessageService, public dialog: MatDialog,private klpService:KLPService,private router:Router) {
    // this.messages.push({
    //   type: 'client',
    //   message: 'Hi, Please drag risks from risk classification and drop it here.Once done please click on submit button.',
    // });
    this.security = [{ type: 'client', message: 'Security Risk1' }, { type: 'client', message: 'Security Risk2' }, { type: 'client', message: 'Security Risk3' }, { type: 'client', message: 'Security Risk4' }];
    this.Prisk = [{ type: 'client', message: 'Risk1' }, { type: 'client', message: 'Risk2' }, { type: 'client', message: 'Risk3' }, { type: 'client', message: 'Risk4' }];
    this.Crisk = [{ type: 'client', message: 'Security Risk1' }, { type: 'client', message: 'Security Risk2' }, { type: 'client', message: 'Security Risk3' }, { type: 'client', message: 'Security Risk4' }];
    this.Klearning = [{ type: 'client', message: 'Key Learning Point 1' },
    { type: 'client', message: 'Key Learning Point 2' }, { type: 'client', message: 'Key Learning Point 3' }, { type: 'client', message: 'Key Learning Point 4' },
    { type: 'client', message: 'Key Learning Point 5' }, { type: 'client', message: 'Key Learning Point 6' },
    { type: 'client', message: 'Key Learning Point 7' }, { type: 'client', message: 'Key Learning Point 8' },
    { type: 'client', message: 'Key Learning Point 9' }, { type: 'client', message: 'Key Learning Point 10' }];
  }
  panelOpenState = false;
  title = 'chatbox';
  todo = {
    'Unauthorized access to pension accounts': 'PR', 'Investment risks and market fluctuations': 'PR',
    'Fraudulent insurance claims': 'PR', 'Online Dating Scams': 'PR', 'Falling for Online Scams or Phishing Attempts': 'PR',
    'Online Financial Transactions': 'PR',
    'Identity theft and fraud': 'PR',
    'Joint Bank Accounts and Finances': 'PR',
    'Online Fraud': 'PR',
    'Phishing attempts and scams': 'PR',
    'Identity theft': 'PR',
    'Catfishing or Deceptive Online Identity': 'PR',
    'Online Scams and Fraud': 'PR'
  };
  securitys = ['Impulsive Sharing', 'Limited Trust and Familiarity', 'Sharing Personal Information Indiscriminately',
    'Exposure of Personal Identifiable Information (PII)', 'Data breaches and leakage of personal information',
    'Online reputation management', 'Accumulated Digital Footprint', 'Online reputation and job search', 'Online Targeting and Exploitation:',
    "Ex-Partner's Actions", 'Privacy Breaches', 'Exposure of personal information', 'Blackmail or Threats', 'Resume and Profile Privacy', 'Fake Job Applications'
  ];
  done = ['Hi, I am your support agent. How can I help you?'];
  // done = [];

  cyber = ['Internet of Things (IoT) vulnerabilities', 'Inadequate Cybersecurity Practices', 'Not Regularly Reviewing Privacy Settings',
    'Phishing Scams', 'Wi-Fi Security', 'Online scams and fraudulent activities',]
  test = ['Key Learning Point 1', 'Key Learning Point 2', 'Key Learning Point 3', 'Key Learning Point 4', 'Key Learning Point 5', 'Key Learning Point 6', 'Key Learning Point 7',
    'Key Learning Point 8', 'Key Learning Point 9', 'Key Learning Point 10'];
  social = ['risk1'];
  keys = Object.keys(this.todo);
  keyLearningPts = 'Safeguard personal information by using strong, unique passwords for tax-related accounts and enabling two-factor authentication whenever possible. Be cautious of sharing personal information online or over the phone unless it is with trusted and verified sources.';
klpDetail ='Title of the Story "Resilient Wings"\
\n Departure from the Air Force:\
\nOnce upon a time, in a small town, there lived a young man named Alex. He had always dreamt of serving in the Air Force, soaring through the skies with unwavering pride. At the age of 18, he enlisted in the military and embarked on an extraordinary journey.\
\nThe Price of Sacrifice:\
\nDuring his time in the Air Force, Alex encountered a physical injury that hindered his ability to continue serving. Despite his deep love for his country, he had to make the difficult decision to leave the military at the tender age of 21. The transition was emotionally challenging, as he had to face the reality of leaving behind the life he had always known.\
\nA Broken Heart:\
\nIn addition to his military departure, Alex was also going through a heart-wrenching breakup with his long-term partner, Sarah. The strain of distance and the demanding nature of military life had taken its toll on their relationship, leading to an inevitable parting of ways. The combination of leaving the Air Force and the end of a significant relationship left Alex feeling lost and uncertain about his future.\
\nThe Struggles of Unemployment: \nFinding himself thrust into the civilian world earlier than expected, Alex faced the harsh reality of unemployment. Without a clear career path or support network, he was left grappling with feelings of purposelessness. Despite his dedication and skills acquired in the Air Force, securing a job became a daunting challenge.\
\nLingering Shadows: \nAs time went by, Alex realized that leaving the Air Force early had left him vulnerable in unexpected ways. His access to military systems or accounts had not been properly terminated, exposing him to potential unauthorized access. Fearing the consequences of this oversight, he decided to take action and protect his privacy.\
\nA Beacon of Hope:\nDriven by his resilience and determination, Alex sought assistance to rectify the issue. He updated his resume and online profiles, emphasizing his skills, discipline, and adaptability gained from his military experience. While navigating the treacherous waters of unemployment, he remained vigilant against phishing emails, carefully scrutinizing every communication that came his way.';

toppings = new FormControl('');
  toppingList: string[] = ['Relationship Breakdown', 'Leaving Armed Force', 'Serious Illness', 'LGBTQ+'];
  selected:boolean = false;


  step: number | undefined = -1;
  Questions: string[] = ['Do you want al carte with risk?','Do you want to go with persona?'];
  ngOnInit() {
  }
  showchat(event: CdkDragDrop<string[]>) {
    this.messages = [];
    this.disabled = false;
    this.severity = this.severity + 30;
    this.count = this.count + 1;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.klpList.push(this.keyLearningPts);
      this.callRiskStory(event);
      // this.callRiskStory(event).then((val) => {
      //   this.showtyping = false;
      //   this.klpList.push(this.klpDetail);
      // });

    }

  }
  callRiskStory(event: CdkDragDrop<string[]>) {
   // const sentMessage = event.container.data[0];
  // console.log('callRiskStory', event.container.data[1].length);
   console.log('callRiskStory', event.container.data);
   event.container.data.forEach((data,i)=>{
    if(data){
this.messages.push({ type: 'user', message: data , domain:this.riskTag});
this.severityMsg = data;
    }

   })
  //  event.container.data[0].length ? this.messages.push({ type: 'user', message: event.container.data[0] }):
  //  this.messages.push({ type: 'user', message: event.container.data[event.container.data.length -1] })
  //  ;
    //this.messages.push({ type: 'user', message: event.container.data[1] });
   

    this.klpService.setKLP(this.klpList);
    //sessionStorage.setItem('item', this.klpList)
    this.klpService.setProduct('HI');

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
  drag(exited: CdkDragExit<any>,item:any){
   console.log('dragged',item,exited.item.element.nativeElement.innerText);
   this.riskTag = item;
   this.klpList.push(this.keyLearningPts);
   this.messages.push({type:'user',message:exited.item.element.nativeElement.innerText,domain:item});
   this.severityMsg = exited.item.element.nativeElement.innerText;
   this.disabled = false;
   this.severity = this.severity + 30;
   this.count = this.count + 1;
  }

  drop(event: CdkDragDrop<string[]>) {
   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('else event',event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
  scrollToBottom() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight + 500;
      } catch (err) { }
    }, 150);
  }
  refresh() {
    window.location.reload()
  }
  getRisk(event: any) {
    console.log('calling');
    this.openStory = true;
    // event.forEach((element: any) => {
    //   this.messages.push({ type: 'user', message: element })
    // });
    console.log('event is', event);
  }
  open() {
    this.startJourney = false;
  }

  openRisk(event: any) {
    this.startJourney = event;
  }
  sendMessage() {
    const sentMessage = this.chatForm.value.message!;
    this.loading = true;
    this.messages.push({
      type: 'user',
      message: sentMessage,
      domain:this.riskTag
    });
    this.chatForm.reset();
    this.scrollToBottom();
    this.messageService.sendMessage(sentMessage).subscribe((response: any) => {
      this.loading = false;
      this.messages.push({
        type: 'client',
        message: response.message,
        domain:this.riskTag
      });
      this.scrollToBottom();
    });
  }
  getPersona(data:any){
    this.data=data;
    console.log('data is from risk ',this.data );
  }
  submitRisk(){
    this.length = this.messages.length * 50;
    this.disabled = true;
   this.showTyping().then(val =>{
   // this.length = this.messages.length * 100;
    this.showtyping = false;
   })

  }

  showTyping(){
    // important logic 
   this.showtyping = true;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.messages.push({
          type: 'client',
          message: this.klpDetail,
         // domain:this.riskTag
        })
        resolve('1'); // pass values
      }, 2000);
    });
    // imp logic ends
  }

  openDialog() {
   this.showDialog = true;
  }
  closeDialog(){
    this.showDialog = false;
  }
  navigateWithState() {
    
    const queryParams: any = {};
    queryParams.list = this.klpList;
    queryParams.story=this.klpDetail;
    queryParams.messages = JSON.stringify(this.messages);
    console.log('this.klpList',this.messages);
  //  const options ={queryParams:{list :this.klpList,story:this.klpDetail,messages:JSON.stringify(this.messages)}};
   // this.router.navigate(['/klp'], options);
       // Create our 'NaviationExtras' object which is expected by the Angular Router
       const navigationExtras: NavigationExtras = {
        queryParams
      };
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/klp`],navigationExtras));
    window.open(url, '_blank');
  }
  ngOnDestroy() {
    this.klpService.KLP = this.klpList;
  }
  task: Task = {
    name: 'Risks based on your persona',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Unauthorized access to pension accounts', completed: false, color: 'primary',domain:'Financial Risk'},
      {name: 'Online Dating Scam', completed: false, color: 'primary', domain:'Financial Risk'},
      {name: 'Online Fraud', completed: false, color: 'primary',domain:'Financial Risk'},
      {name: 'Identity theft', completed: false, color: 'primary',domain:'Financial Risk'},
      {name: 'Exposure of Personal Identifiable Information (PII)', completed: false, color: 'primary',domain:'Personal Risk'}
    ]
  };

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
    this.task.subtasks?.forEach((t) => {
      if (t.completed === true) {
        this.count = this.count + 1 ;
        this.messages.push({ type: 'user', message: t.name,domain:t.domain });
        this.klpList.push(this.keyLearningPts);
      }
     
    })
    if(this.messages.length){
      this.openStory = true;
      this.showDialog = false;
      this.disabled = false;
      } else {
       this.selected = true;
      }
  }
  openDomainStory(){
    const msg= '"Fragile Trust: Guarding the Embers of Identity" follows the story of Sergeant Emily Thompson, a dedicated servicemember transitioning out of the armed forces.\
     As she adjusts to civilian life, she receives alarming news of a potential breach of personal identifiable information (PII) stored within military databases. Fueled by concern for her fellow servicemembers, \
     Sergeant Thompson embarks on a quest to understand the extent of the breach. Collaborating with cybersecurity experts and fellow veterans, she unveils the true scope of the data breach, revealing that sensitive PII is at risk of unauthorized access. \
     Determined to protect her comrades-in-arms, Sergeant Thompson becomes an advocate for enhanced information security measures. Her efforts lead to the implementation of robust safeguards within the military, empowering servicemembers to protect their identities. Through her resilience, Sergeant Thompson not only rebuilds trust in the military ability to safeguard PII \
     but also becomes a guiding light for others, ensuring the sanctity of their identities and preserving the trust bestowed upon military institutions.'
    this.messages.push({type:'client',message:msg});
  }
  // scrollToBottom() {
  //   setTimeout(() => {
  //     try {
  //       this.myScrollContainer.nativeElement.scrollTop =
  //         this.myScrollContainer.nativeElement.scrollHeight + 500;
  //     } catch (err) {}
  //   }, 150);
  // }
}
