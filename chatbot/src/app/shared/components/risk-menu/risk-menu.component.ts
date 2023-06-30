
import { Component, Input, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';
export interface Message {
  type: string;
  message: string;
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
klpDetail ="Once upon a time, in a world where technology ruled supreme, there was a former soldier named Jack. Jack had served his country honorably, but due to personal reasons, he left the army early. Little did he know that this decision would set off a chain of events that would threaten the security of both military systems and the pension accounts of retired soldiers.As Jack transitioned back into civilian life, he found himself drawn to the world of hacking and cybersecurity. With his military background, he possessed a unique skill set that made him an expert in identifying vulnerabilities in computer systems. \n However, instead of using his skills for good, he was consumed by a desire for revenge against the army that he felt had betrayed him. \
Jack decided to exploit the potential flaw in the termination process of military systems and accounts. Due to a miscommunication or oversight, his access to military systems had not been properly terminated when he left the army. This oversight left a backdoor open, a virtual key to the kingdom that Jack could potentially exploit.\
\n But Jack's ambitions didn't stop there. He discovered that retired soldiers' pension accounts were also linked to the same system. This realization sparked a diabolical plan in his mind. He realized that by gaining access to both the military systems and the pension accounts, he could not only wreak havoc but also profit from the vulnerable retirees.\
\n Utilizing his hacking skills, Jack managed to infiltrate the military network undetected. The Internet of Things (IoT) vulnerabilities played right into his hands. He exploited weaknesses in the military's IoT devices, from surveillance cameras to drones, using them as gateways into the network.\
Once inside, Jack maneuvered through the labyrinth of classified information, military databases, and sensitive files. He knew he had to be careful to avoid detection, as any trace of his activities could lead to dire consequences.\
Simultaneously, he delved deeper into the pension account system. By gaining access to retiree accounts, he could siphon off funds, leaving the vulnerable soldiers in financial ruin. Jack's plan was not just about revenge; it was a twisted attempt to prove his superiority over the system that had cast him aside.\
 \n However, unbeknownst to Jack, a brilliant cybersecurity analyst named Sarah was hot on his trail. Sarah, employed by a private cybersecurity firm, had been monitoring the military network for suspicious activities. When she noticed unauthorized access attempts, she dedicated herself to uncovering the culprit.\
Sarah's expertise in IoT vulnerabilities helped her trace the hacker's entry point. With each passing moment, the tension grew, as she realized the stakes were much higher than she initially thought. She knew that if she didn't act swiftly, the consequences could be catastrophic. \
\n Armed with determination, Sarah worked tirelessly, employing her skills to identify and neutralize Jack's infiltration. She quickly patched the IoT vulnerabilities, cutting off his access points and ensuring that the system was secure once again. She also alerted the military authorities about the breach and the potential danger to retiree pension accounts.\
Meanwhile, Jack was unaware that Sarah was closing in on him. He continued his sinister mission, blissfully ignorant of the imminent danger he was about to face. But his arrogance proved to be his downfall.\
In a dramatic turn of events, Sarah successfully tracked Jack's location and coordinated with the military to apprehend him. The day of reckoning had come for Jack, as he was arrested and charged with multiple offenses, including unauthorized access, identity theft, and attempted financial fraud.\
Thanks to Sarah's quick thinking and expertise, the military systems were secured, and retiree pension accounts were protected from any financial harm. The incident served as a wake-up call for the army, leading to comprehensive reviews of their termination processes and increased cybersecurity measures.";


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
this.messages.push({ type: 'user', message: data });
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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
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
    });
    this.chatForm.reset();
    this.scrollToBottom();
    this.messageService.sendMessage(sentMessage).subscribe((response: any) => {
      this.loading = false;
      this.messages.push({
        type: 'client',
        message: response.message,
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
    console.log('this.klpList',this.klpList);
    const options ={queryParams:{list :this.klpList,story:this.klpDetail}};
   // this.router.navigate(['/klp'], options);
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/klp`],options));
    window.open(url, '_blank');
  }
  ngOnDestroy() {
    this.klpService.KLP = this.klpList;
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
