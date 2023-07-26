import { Component, ViewChild, ChangeDetectionStrategy, EventEmitter, Output, NgZone, Input } from '@angular/core';
import riskListJson from '../../Json/riskList.json';
import * as questionstest from '../../Json/questionstest.json';
import { ThemePalette } from '@angular/material/core';

export interface Message {
  type: string;
  message: any;
  id?: number;
}

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
  domain?: string;
  klp?: string;
}

export interface Riskdata {
  "Financial Risk-(FR)": string[];
  "Personal Risk-(PR)": string[];
  "CyberSecurity Risk -(CsR)": string[];
  "Social Risk-(SR)": string[];
  "Mental Risk-(MR)": string[];
}


@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.component.html',
  styleUrls: ['./help-support.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HelpSupportComponent {
  intialId = 1;
  private question = questionstest;
  private riskData = riskListJson as Riskdata;
  isActiveAnswer = true;
  isOpen = false;
  loading = false;
  messages: Message[] = [];
  @Output() riskDetail = new EventEmitter();
  @Output() persona = new EventEmitter();
  flipped: boolean[] = [];
  selectedAnswer: any = [];
  personaDetail: any = [];
  riskIndex: number = -1;
  answerList: any;
  questionList: any;
  @Input() riskType: string = '';
  selectedRisks: any = [];
  selectedKLP: any = [];

  constructor() { }

  ngOnInit() {
    this.messages = [];
  }

  // Function to open create avatar question pop up and display first question with answer
  openSupportPopup() {
    !this.riskType ? alert('Please select risk') : this.isOpen = !this.isOpen;
    if (this.isOpen && !this.messages.length) {
      this.question ? Object.keys(this.question).forEach((val, i) => {
        if (this.question[i]?.type === this.riskType) {
          this.riskIndex = i;
          Object.keys(this.question[i].questions).forEach((item: any, j) => {
            if (j == 0) {
              this.messages.push({
                type: 'client',
                message: Object.values(this.question[i].questions[item])[1],
              });
              this.questionList = Object.values(this.question[i].questions);
              this.answerList = Object.values(this.question[i].questions);
            }
          })
        }
      }) : undefined;
    //  const intialVal = this.example.evalData[0].answers;
      this.callAnswer(this.answerList);
      this.intialId = 1;

    }
  }
  
  // Function to call question after selecting answer
  personaAnswer(event: Event, type: string, i: number) {
    this.personaDetail.push((event.target as HTMLInputElement).innerText);
    this.selectedAnswer.push((event.target as HTMLInputElement).innerText);
    if (type === 'user') {
      this.flipped[i] = !this.flipped[i];
      this.removeElement(this.selectedAnswer).then((res) => {
        this.callQuestion(this);
      });
    }
  }
  // Function to remove options which is not selected
  removeElement(element: string) {
    const event = this.messages;
    this.messages = [];
    return new Promise(resolve => {
      event.forEach((ele, i) => {
        if (ele.type === 'client') {
          this.messages.push(ele)
        } else {
          if (element.includes(ele.message)) {
            this.messages.push(ele);
            this.callRiskKLP(ele);
          }
        }
      })
      resolve(1)
    })
  }
// Function to get risks and klp based on the answer selected
  callRiskKLP(ele: any) {
    let risk: string[] = [];
    this.answerList[this.intialId - 1]?.optionList.forEach((element: any, i: any) => {
      if (element.id === ele.id) {
        if (element.risk.length) {
          let riskVal: string = '';
          element.risk.forEach((item: string, i: number) => {
            if (!risk.includes(item)) {
              const riskDomain = this.findDomainByValue(this.riskData, item);
              this.selectedRisks.push({ name: item, completed: false, color: 'primary', domain: riskDomain, klp: element.klp[i] });
              risk.push(item);
            }
          });
        }
      }
    });
  }

  // Function to display answer options
  callAnswer(answers: any) {
    if (answers)
      answers[this.intialId - 1]?.optionList.forEach((element: any, i: any) => {
        this.messages.push({ type: 'user', message: element.value, id: element.id });
        this.isActiveAnswer = false;
      });

  }
  // Function to find the risk belong to which domain 
  findDomainByValue(obj: any, value: string): string {
    for (const key in obj) {

      if (obj[key] && (obj[key].includes(value))) {
        return key;
      }


    }
    return ""
  }

  // Function to display questions based on the type of transition
  callQuestion(_questionId: this) {
    const intialVal = this.questionList[this.intialId];
    if (intialVal?.question) {
      this.messages.push({ type: 'client', message: intialVal.question });
      this.intialId = this.intialId + 1;
      this.callAnswer(this.answerList);
    } else {
      this.submitData();
    }
  }

  // Function to associate risk and klp 
  submitData() {
    this.selectedAnswer = [];
    const task: Task = {
      name: 'Risks based on your persona',
      completed: false,
      color: 'primary',
      subtasks: this.selectedRisks
    };
    this.msgToParent(task);
    this.personaDetail = [];
    this.openSupportPopup();
  }

  //Function to send data from this component to risk component
  msgToParent(detail: any) {
    this.riskDetail.emit(detail);
    this.persona.emit(this.personaDetail);
  }
}

