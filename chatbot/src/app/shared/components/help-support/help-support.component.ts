import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../../service/message.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import AvatarJson from '../../Json/avatar.json';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  CdkDragExit,
} from '@angular/cdk/drag-drop';

export interface Message {
  type: string;
  message: string;
}

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.component.html',
  styleUrls: ['./help-support.component.scss'],
})
export class HelpSupportComponent {
  isOpen = false;
  loading = false;
  messages: Message[] = [];
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  arr:any=[];
  @ViewChild('scrollMe') private myScrollContainer: any;
  security=['Hi, I am your support agent. How can I help you?','risk2'];
  constructor(private messageService: MessageService,private httpService:HttpClient) {
    this.httpService.get('C:/Users/I038849/Desktop/Risk Support/chatbot/src/app/shared/Json/avatar.json').subscribe(data => console.log('value of data is ',data));
    this.messages.push({
      type: 'client',
      message: 'How long did you serve in the armed forces?',
    });
  }
  ngOnInit(){
    this.httpService.get('C:/Users/I038849/Desktop/Risk Support/chatbot/src/app/shared/Json/avatar.json').subscribe(data => console.log('value of data is ',data));
  }

  openSupportPopup() {
    this.isOpen = !this.isOpen;
  }
  drop(event: CdkDragDrop<string[]>){
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
      } catch (err) {}
    }, 150);
  }
}
