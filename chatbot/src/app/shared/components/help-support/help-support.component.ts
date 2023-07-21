import { Component, ViewChild, ChangeDetectionStrategy, EventEmitter, Output, NgZone, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../../service/message.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import * as avatarJson from '../../Json/avatar.json';
import * as questionstest from '../../Json/questionstest.json';
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
import { KLPService } from '../../service/klp.service';
import { ThemePalette } from '@angular/material/core';

export interface Message {
  type: string;
  message: any;
  id?:number;
}

// export interface riskKLP{
//   id:number;
//   risk:[];
//   klp:[];
// }

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
  domain?:string;
  klp?:string;
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
  private question = questionstest;
  isActiveAnswer = true;
  isOpen = false;
  loading = false;
  messages: Message[] = [];
  //riskKLP:riskKLP[]=[];
  @Output() riskDetail = new EventEmitter();
  @Output() persona = new EventEmitter();
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  flipped: boolean[] = [];
  arr: any = [];
  @ViewChild('scrollMe') private myScrollContainer: any;
  security = ['Hi, I am your support agent. How can I help you?', 'risk2'];
  selectedAnswer: any = [];
  personaDetail: any = [];
  riskIndex: number = -1;
  answerList: any;
  questionList: any;
  @Input() riskType: string = '';
  selectedRisks:any =[];
  selectedKLP:any=[];
  constructor(private klpService: KLPService, private messageService: MessageService, private httpService: HttpClient, private dialogRef: MatDialog, private zone: NgZone) {

  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.klpService.selectedProduct$.subscribe((value) => {
      //  console.log('value is',value);
      // this.data = value;
    });
    this.messages = [];
    // this.messages.push({
    //   type: 'client',
    //   message: 'How long did you serve in the armed forces?',
    // });


  }

  openSupportPopup() {

    !this.riskType ?
      alert('Please select risk')
      : this.isOpen = !this.isOpen;
    if (this.isOpen) {

      this.question ? Object.keys(this.question).forEach((val, i) => {
        // console.log(this.question[i]);
        if (this.question[i]?.type === this.riskType) {
          this.riskIndex = i;

          Object.keys(this.question[i].questions).forEach((item: any, j) => {
            // console.log(Object.values(this.question[i].questions[item]));
            if (j == 0) {
              this.messages.push({
                type: 'client',
                message: Object.values(this.question[i].questions[item])[1],
              });
              this.questionList = Object.values(this.question[i].questions);
              //  this.answerList = Object.values(this.question[i].questions[i].optionList);
              this.answerList = Object.values(this.question[i].questions);
            }

          })
        }

      }) : undefined;
      // this.messages.push({
      //   type: 'client',
      //   message: this.question[i].questions[item].question[0],
      // });

      //  console.log(this.question);
      const intialVal = this.example.evalData[0].answers;
      // console.log('intialVal is',intialVal);
      // this.callAnswer(intialVal);
      this.callAnswer(this.answerList);
      this.intialId = 1;

    }
  }
  drop(event: CdkDragDrop<string[]>) {
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
  personaAnswer(event: Event, type: string, i: number) {
    this.personaDetail.push((event.target as HTMLInputElement).innerText);
    this.selectedAnswer.push((event.target as HTMLInputElement).innerText);
    if (type === 'user') {
      this.flipped[i] = !this.flipped[i];
      //  this.removeElement(this.selectedAnswer);
      this.removeElement(this.selectedAnswer).then((res) => {
        this.callQuestion(this);
      });
      // this.callQuestion(this);
    }
  }
  removeElement(element: string) {
    const testing = this.messages;
    this.messages = [];
    return new Promise(resolve => {
      testing.forEach((ele, i) => {
        if (ele.type === 'client') {
          this.messages.push(ele)
        } else {
          if (element.includes(ele.message)) {
            this.messages.push(ele);
            this.callRiskKLP(ele);
           // console.log('this.messages is',this.messages);
          }
        }
      })
      resolve(1)
    })
  }
  callRiskKLP(ele:any){
    let risk :string[] =[];
   // console.log('ele is',ele);
    this.answerList[this.intialId - 1]?.optionList.forEach((element: any, i: any) => {
    //  console.log('element.id',element);
      if(element.id === ele.id){


      
        if(element.risk.length )
        {
          element.risk.forEach((item:string,i:number) => {
          //  risk.push(item);
            console.log(risk);
            console.log('item',item);
            if (!risk.includes(item)) {
            //  unique.push(element);
            this.selectedRisks.push( {name: item, completed: false, color: 'primary',domain:'Financial Risk',klp:element.klp[i]});
            risk.push(item);
          }
           
          });
        }
        // if(element.klp.length){
        //   element.klp.forEach((klp:string)=> {
        //     this.selectedKLP.push(klp);
        //   });
        // }
     //  this.selectedriskKLP?.push({risk:element?.risk.substring(1,element.risk.length -1)});
      }

    });
   

   console.log('klprisks are ',this.selectedRisks);

  }
  callAnswer(answers: any) {
   //  console.log('answerList is testing ',   answers[this.intialId - 1]);
    if (answers)
      answers[this.intialId - 1]?.optionList.forEach((element: any, i: any) => {
    //    console.log('answere is',element)
        this.messages.push({ type: 'user', message: element.value, id:element.id });
     //   this.riskKLP.push({id:element.id,risk:element.risk,klp:element.klp});
        this.isActiveAnswer = false;
      });

  }
  callQuestion(_questionId: this) {
    const intialVal = this.questionList[this.intialId];
    //  const intialVal = this.example.evalData[this.intialId] ? this.example.evalData[this.intialId].question : this.submitData();
    // if (this.example.evalData[this.intialId]) {
    if (intialVal?.question) {
      this.messages.push({ type: 'client', message: intialVal.question });
      //  this.callAnswer(this.example.evalData[this.intialId].answers);
     // console.log('answerList', this.answerList);

      this.intialId = this.intialId + 1;
      this.callAnswer(this.answerList);
    } else {
      this.submitData();
    }
  }
  submitData() {

    // 
    this.selectedAnswer = [];
    // const currentMsgToParent = ['Financial Risk->Unauthorized Access', "Scenario: Ex-army individuals may store tax-related documents electronically, such as scanned copies of receipts or tax forms. If these documents are not adequately protected, unauthorized individuals may gain access to them, potentially leading to identity theft or tax fraud.",
    //   'Personal Risk->Identity Theft:', ' Scenario: Ex-army individuals managing their own taxes may become targets for identity thieves who seek to steal personal information for fraudulent purposes. This can include using stolen identities to file false tax returns, claim refunds, or obtain financial benefits.'];
      const task: Task = {
        name: 'Risks based on your persona',
        completed: false,
        color: 'primary',
        subtasks: this.selectedRisks
      };
   // this.msgToParent(currentMsgToParent);
   this.msgToParent(task);
    this.personaDetail = [];
    this.openSupportPopup();
    // this.ngOnInit();
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
    this.persona.emit(this.personaDetail);
  }
}

