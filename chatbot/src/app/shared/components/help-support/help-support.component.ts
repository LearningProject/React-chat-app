import { Component, ViewChild, ChangeDetectionStrategy, EventEmitter, Output ,NgZone} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../../service/message.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import * as avatarJson from '../../Json/avatar.json';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  CdkDragExit,
} from '@angular/cdk/drag-drop';
import { AlertComponentComponent } from '../alert-component/alert-component.component';

export interface Message {
  type: string;
  message: any;
}

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.component.html',
  styleUrls: ['./help-support.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpSupportComponent {
  intialId = 1;
  private example = avatarJson;
  isActiveAnswer = true;
  isOpen = false;
  loading = false;
  messages: Message[] = [];
  @Output() riskDetail = new EventEmitter();
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  flipped: boolean[] = [];
  arr: any = [];
  @ViewChild('scrollMe') private myScrollContainer: any;
  security = ['Hi, I am your support agent. How can I help you?', 'risk2'];
  selectedAnswer: any=[];
  constructor(private messageService: MessageService, private httpService: HttpClient, private dialogRef: MatDialog,private zone:NgZone) {

  }
  ngAfterViewInit() {
   
}
  ngOnInit() {
    this.messages.push({
      type: 'client',
      message: 'How long did you serve in the armed forces?',
    });
    const intialVal = this.example.evalData[0].answers;
    this.callAnswer(intialVal);
  }

  openSupportPopup() {
    this.isOpen = !this.isOpen;
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
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

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight + 500;
      } catch (err) { }
    }, 150);
  }
   async personaAnswer(event: Event, type: string, i: number) {
    this.selectedAnswer.push((event.target as HTMLInputElement).innerText);
    if (type === 'user') {
      this.flipped[i] = !this.flipped[i];
      this.removeElement(this.selectedAnswer).then((res)=>{
        console.log('res',res);
        this.callQuestion(this);
      });
    }
  }
   removeElement(element: string) {
    // new Promise((resolve,reject)=>{
    const testing = this.messages;
    this.messages = [];
    return new Promise(resolve => {
    testing.forEach((ele, i) => {
      if (ele.type === 'client') {
        this.messages.push(ele)
      //  resolve(this.messages);
      } else {
        if (element.includes(ele.message)) {
          this.messages.push(ele);
        //  resolve(this.messages);
        }
      }
    // resolve(this.messages);
    }
    
    )
    resolve(true)
  })
  //  return this.messages;
  }
  callAnswer(answers: any) {
    answers.forEach((element: any, i: any) => {
      this.messages.push({ type: 'user', message: element.answer });
      this.isActiveAnswer = false;
    });

  }
  callQuestion(_questionId: this) {
    const intialVal = this.example.evalData[this.intialId] ? this.example.evalData[this.intialId].question : this.submitData();
    if (this.example.evalData[this.intialId]) {
      this.messages.push({ type: 'client', message: intialVal });
      this.callAnswer(this.example.evalData[this.intialId].answers);
      this.intialId = this.intialId + 1;
    }
  }
  submitData() {
    //this.messages =[];
    const currentMsgToParent = ['Financial Risk->Unauthorized Access', "Scenario: Ex-army individuals may store tax-related documents electronically, such as scanned copies of receipts or tax forms. If these documents are not adequately protected, unauthorized individuals may gain access to them, potentially leading to identity theft or tax fraud.",
     'Personal Risk->Identity Theft:',' Scenario: Ex-army individuals managing their own taxes may become targets for identity thieves who seek to steal personal information for fraudulent purposes. This can include using stolen identities to file false tax returns, claim refunds, or obtain financial benefits.' ];
    this.msgToParent(currentMsgToParent);
    this.openSupportPopup();
    // this.dialogRef.open(AlertComponentComponent, {
    //   height: 'auto',
    //   width: '500px',
    //   panelClass: 'my-centered-dialog',
    //   data: {
    //   },
    // });

  }
  msgToParent(detail: any) {
    this.riskDetail.emit(detail);
  }
}

