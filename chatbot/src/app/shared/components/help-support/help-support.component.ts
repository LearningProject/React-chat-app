import { Component, ViewChild } from '@angular/core';
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
})
export class HelpSupportComponent {
  intialId = 1;
  private example = avatarJson;
  isActiveAnswer = true;
  isOpen = false;
  loading = false;
  messages: Message[] = [];
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  flipped: boolean[] = [];
  arr: any = [];
  @ViewChild('scrollMe') private myScrollContainer: any;
  security = ['Hi, I am your support agent. How can I help you?', 'risk2'];
  constructor(private messageService: MessageService, private httpService: HttpClient, private dialogRef: MatDialog) {
    this.messages.push({
      type: 'client',
      message: 'How long did you serve in the armed forces?',
    });
  }
  ngOnInit() {
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
  personaAnswer(event: any, type: string, i: number) {
    if (type === 'user') {
      this.flipped[i] = !this.flipped[i]
      this.callQuestion(this.intialId);
    }
  }
  callAnswer(answers: any) {
    answers.forEach((element: any, i: any) => {
      this.messages.push({ type: 'user', message: element.answer });
      this.isActiveAnswer = false;
    });

  }
  callQuestion(questionId: number) {
    const intialVal = this.example.evalData[this.intialId] ? this.example.evalData[this.intialId].question : this.submitData();
    this.messages.push({ type: 'client', message: intialVal });
    this.callAnswer(this.example.evalData[this.intialId].answers);
    this.intialId = this.intialId + 1;
  }
  submitData() {
    this.dialogRef.open(AlertComponentComponent, {
      data: {
      },
    });
  }
}

