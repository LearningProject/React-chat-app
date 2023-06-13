
import { Component, Input, ViewChild } from '@angular/core';
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
  severityMsg :string = '';
  
  constructor(private messageService: MessageService) {
    this.messages.push({
      type: 'client',
      message: 'Hi, I am your support agent. How can I help you?',
    });
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

  cyber = ['Internet of Things (IoT) vulnerabilities', 'Inadequate Cybersecurity Practices', 'Not Regularly Reviewing Privacy Settings',
    'Phishing Scams', 'Wi-Fi Security', 'Online scams and fraudulent activities',]
  test = ['Key Learning Point 1', 'Key Learning Point 2', 'Key Learning Point 3', 'Key Learning Point 4', 'Key Learning Point 5', 'Key Learning Point 6', 'Key Learning Point 7',
    'Key Learning Point 8', 'Key Learning Point 9', 'Key Learning Point 10'];
  social = ['risk1'];
  keys = Object.keys(this.todo);


  ngOnInit() {
  }
  showchat(event: CdkDragDrop<string[]>) {
    this.severity = this.severity + 30;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      ); const sentMessage = event.container.data[0];
      this.messages.push({ type: 'user', message: event.container.data[event.container.data.length - 1] });
      this.severityMsg = event.container.data[event.container.data.length - 1];
      setTimeout(() => this.messages.push({
        type: 'client',
        message: 'Safeguard personal information by using strong, unique passwords for tax-related accounts and enabling two-factor authentication whenever possible. Be cautious of sharing personal information online or over the phone unless it is with trusted and verified sources.',
      }), 1000);
    }
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
    event.forEach((element: any) => {
      this.messages.push({ type: 'user', message: element })
    });
    console.log('event is', event);
  }
  open() {
    this.startJourney = false;
  }

  openRisk(event: any) {
    this.startJourney = event;
  }
}
