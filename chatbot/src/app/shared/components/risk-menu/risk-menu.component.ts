
import { Component,ViewChild } from '@angular/core';
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
  todo = { 'Risk1': 'PR', 'Risk2': 'PR', 'Risk3': 'PR', 'Risk4': 'PR' };
  securitys = ['Security Risk1', 'Security Risk2', 'Security Risk3', 'Security Risk4'];
  done = ['Hi, I am your support agent. How can I help you?'];


  test = ['Key Learning Point 1', 'Key Learning Point 2', 'Key Learning Point 3', 'Key Learning Point 4', 'Key Learning Point 5', 'Key Learning Point 6', 'Key Learning Point 7',
    'Key Learning Point 8', 'Key Learning Point 9', 'Key Learning Point 10'];
  keys = Object.keys(this.todo);


  ngOnInit() {
  }
  showchat(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );const sentMessage = event.container.data[0];
      this.messages.push({ type: 'user', message: event.container.data[event.container.data.length - 1]});
      setTimeout( ()=>  this.messages.push({
        type: 'client',
        message: 'getting data',
      }),1000);
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
      } catch (err) {}
    }, 150);
  }
}
