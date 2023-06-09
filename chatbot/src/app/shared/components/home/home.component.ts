import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
// import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { MatStepper } from '@angular/material/stepper';
// import { StoryService } from '../services/story.service';
// import { QuestionService } from '../services/question.service';
// import { questions } from '../class/questions'
// import { data } from '../class/data'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // //@ts-ignore
  // @ViewChild("questionModel", { static: true }) questionModel: NgbModalRef<any>;
  // //@ts-ignore
  // @ViewChild("storyModel", { static: true }) storyModel: TemplateRef<any>;

//   openQuestionModel: any;

//   completed: boolean = false;
//   state: string = '';
//   title = 'risk-playground';
//   closeResult: string = '';
//   startJourney = false;
//   isLinear = false;
//   stepperFinished = false;
//   stepperStarted = false;
//   stepperSubmitted = false;
//   journeyId = 0;
//   genetatedStroy = '';
//   generatedKLP = [];
//   generatedRisks = [];
//   isVarified = true;
//   previousIndexArray: number[] = [];

//   questionSetRelationshipBreakdown = Array<questions>();
//   questionSetLAF = Array<questions>();
//   questionSetSI = Array<questions>();
//   questionSetLGBTQ = Array<questions>();

//   questionSet: any;

//   answerJson: any;
//   constructor(private modalService: NgbModal, private modal: NgbModal, private storyService: StoryService, private questionService: QuestionService) {

//   }
constructor(){}
  ngOnInit() {
    // this.answerJson = [];
    // this.getQuestions();
  }

//   getQuestions() {
//     this.questionService.getAllQuestions().subscribe(
//       (response) => {
//         if (response.body) {
//           if (response.body.data) {
//             this.questionSetRelationshipBreakdown = response.body.data[0].questions;
//             this.questionSetLAF = response.body.data[1].questions;
//             this.questionSetSI = response.body.data[2].questions;
//             this.questionSetLGBTQ = response.body.data[3].questions;
//           }
//         }
//       });
//   }

//   startJourneyClick() {
//     this.startJourney = true;
//   }

//   startStepperClick() {
//     this.stepperStarted = true;
//     this.stepperSubmitted = false;
//   }

//   open(content: any, id: any) {
//     if (id == 1) {
//       this.answerJson = [];
//       this.stepperStarted = false;
//       this.stepperSubmitted = false;
//       this.startJourney = true;
//       this.journeyId = id;
//       this.previousIndexArray = [];

//       for (let i = 0; i < this.questionSetRelationshipBreakdown.length; i++) {
//         if (this.questionSetRelationshipBreakdown[i].type === 'radio') {
//           let obj = {
//             id: this.questionSetRelationshipBreakdown[i]?.optionList[0]?.id,
//             index: this.questionSetRelationshipBreakdown[i].index,
//             answer: this.questionSetRelationshipBreakdown[i]?.optionList[0]?.value,
//             nextindex: this.questionSetRelationshipBreakdown[i]?.optionList[0]?.nextIndex,
//             answered: false
//           };
//           this.answerJson.push(obj);
//         }
//       }
//       this.openQuestionModel = this.modal.open(this.questionModel, { size: 'lg', backdrop: 'static' });
//     }

//     if (id == 2) {
//       this.answerJson = [];
//       this.stepperStarted = false;
//       this.stepperSubmitted = false;
//       this.startJourney = true;
//       this.journeyId = id;
//       this.previousIndexArray = [];
//       console.log(this.journeyId);

//       for (let i = 0; i < this.questionSetLAF.length; i++) {
//         if (this.questionSetLAF[i].type === 'radio') {
//           let obj = {
//             id: this.questionSetLAF[i]?.optionList[0]?.id,
//             index: this.questionSetLAF[i].index,
//             answer: this.questionSetLAF[i]?.optionList[0]?.value,
//             nextindex: this.questionSetLAF[i]?.optionList[0]?.nextIndex,
//             answered: false
//           };
//           this.answerJson.push(obj);
//         }
//       }
//       this.openQuestionModel = this.modal.open(this.questionModel, { size: 'lg', backdrop: 'static' });
//     }


//     if (id == 3) {
//       this.answerJson = [];
//       this.stepperStarted = false;
//       this.stepperSubmitted = false;
//       this.startJourney = true;
//       this.journeyId = id;
//       this.previousIndexArray = [];
//       console.log(this.journeyId);

//       for (let i = 0; i < this.questionSetSI.length; i++) {
//         if (this.questionSetSI[i].type === 'radio') {
//           let obj = {
//             id: this.questionSetSI[i]?.optionList[0]?.id,
//             index: this.questionSetSI[i].index,
//             answer: this.questionSetSI[i]?.optionList[0]?.value,
//             nextindex: this.questionSetSI[i]?.optionList[0]?.nextIndex,
//             answered: false
//           };
//           this.answerJson.push(obj);
//         }
//       }
//       this.openQuestionModel = this.modal.open(this.questionModel, { size: 'lg', backdrop: 'static' });
//     }


//     if (id == 4) {
//       this.answerJson = [];
//       this.stepperStarted = false;
//       this.stepperSubmitted = false;
//       this.startJourney = true;
//       this.journeyId = id;
//       this.previousIndexArray = [];
//       console.log(this.journeyId);

//       for (let i = 0; i < this.questionSetLGBTQ.length; i++) {
//         if (this.questionSetLGBTQ[i].type === 'radio') {
//           let obj = {
//             id: this.questionSetLGBTQ[i]?.optionList[0]?.id,
//             index: this.questionSetLGBTQ[i].index,
//             answer: this.questionSetLGBTQ[i]?.optionList[0]?.value,
//             nextindex: this.questionSetLGBTQ[i]?.optionList[0]?.nextIndex,
//             answered: false
//           };
//           this.answerJson.push(obj);
//         }
//       }
//       this.openQuestionModel = this.modal.open(this.questionModel, { size: 'lg', backdrop: 'static' });
//     }
//   }

//   openStoryModel(content: any) {
//     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
//       this.closeResult = `Closed with: ${result}`;
//     }, (reason) => {
//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//     });
//   }

//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return `with: ${reason}`;
//     }
//   }
//   goBackward(stepper: MatStepper, currentIndex: any) {
//     if (this.previousIndexArray.length > 0) {
//       stepper.selectedIndex = this.previousIndexArray[this.previousIndexArray.length - 1] - 1;
//       this.answerJson[currentIndex - 1].answered = false;
//       this.previousIndexArray.pop();
//     }
//   }

//   goForward(stepper: MatStepper, currentIndex: any) {
//     console.log(this.answerJson);
//     if (this.answerJson[currentIndex - 1].nextindex - 1 >= 0) {
//       if (this.answerJson[currentIndex - 1].answer == '') {
//         alert('please fill mandatory fields');
//       } else {
//         this.answerJson[currentIndex - 1]
//         stepper.selectedIndex = this.answerJson[currentIndex - 1].nextindex - 1;
//         this.previousIndexArray.push(currentIndex);
//         this.answerJson[currentIndex - 1].answered = true;
//       }
//     } else {
//       // Call Story Data
//       this.answerJson[currentIndex - 1].answered = true;
//       let finalJson = [];
//       for (let i = 0; i < this.answerJson.length; i++) {
//         if (this.answerJson[i].answered == true) {
//           finalJson.push(this.answerJson[i]);
//         }
//       }
//       let reqJson = { index: this.journeyId, questions: finalJson }
//       this.stepperSubmitted = true;
//       this.storyService.getStoredStory(reqJson).subscribe(
//         (response) => {
//           if (response.body) {
//             this.genetatedStroy = response.body.story;
//             this.generatedKLP = response.body.klp;
//             this.generatedRisks = response.body.risk;
//             this.isVarified = response.body.verified;
//             this.stepperSubmitted = false;
//             this.stepperFinished = true;
//             this.openQuestionModel.close();
//             this.modal.open(this.storyModel, { size: 'lg', backdrop: 'static' });
//           }
//         });

//     }
//   }

//   onChange(e: any, index: any, nextIndex: any, optionText: any, selectedOptionId: any) {
//     let indexFound = false;
//     for (var i = 0; i < this.answerJson.length; i++) {
//       if (this.answerJson[i].index === index) {
//         this.answerJson[i].answer = e.target.value;
//         this.answerJson[i].nextindex = nextIndex;
//         this.answerJson[i].id = selectedOptionId;
//         let optionType = '';
//         if (optionText == 'Prefer to self-describe' || optionText == 'Other') {

//           if (this.journeyId == 1) {
//             let optionsObj = this.questionSetRelationshipBreakdown[index].optionList;
//             for (let j = 0; j < optionsObj.length; j++) {
//               if (optionsObj[j]?.option == 'Prefer to self-describe' || optionsObj[j]?.option == 'Other') {
//                 if (optionsObj[j]?.type !== undefined) {
//                   optionType = optionsObj[j]?.type!;
//                 }
//                 break;
//               }
//             }
//           }
//           if (this.journeyId == 2) {
//             let optionsObj = this.questionSetLAF[index].optionList;
//             for (let j = 0; j < optionsObj.length; j++) {
//               if (optionsObj[j]?.option == 'Prefer to self-describe' || optionsObj[j]?.option == 'Other') {
//                 if (optionsObj[j]?.type !== undefined) {
//                   optionType = optionsObj[j]?.type!;
//                 }
//                 break;
//               }
//             }
//           }
//           if (this.journeyId == 3) {
//             let optionsObj = this.questionSetSI[index].optionList;
//             for (let j = 0; j < optionsObj.length; j++) {
//               if (optionsObj[j]?.option == 'Prefer to self-describe' || optionsObj[j]?.option == 'Other') {
//                 if (optionsObj[j]?.type !== undefined) {
//                   optionType = optionsObj[j]?.type!;
//                 }
//                 break;
//               }
//             }
//           }
//           if (this.journeyId == 4) {
//             let optionsObj = this.questionSetLGBTQ[index].optionList;
//             for (let j = 0; j < optionsObj.length; j++) {
//               if (optionsObj[j]?.option == 'Prefer to self-describe' || optionsObj[j]?.option == 'Other') {
//                 if (optionsObj[j]?.type !== undefined) {
//                   optionType = optionsObj[j]?.type!;
//                 }
//                 break;
//               }
//             }
//           }
//         }
//         indexFound = true;
//         break;
//       }
//     }
//     if (!indexFound) {
//       let obj = { index: index, answer: e.target.value, nextindex: nextIndex };
//       this.answerJson.push(obj);
//     }
//   }

//   onOptionTextChange(e: any, index: any, optionText: any) {
//     if (optionText == 'Prefer to self-describe' || optionText == 'Other') {
//       this.answerJson[index - 1].answer = e.target.value;
//     }
//   }

//   onTextChange(e: any, index: any,) {
//     this.answerJson[index - 1].answer = e.target.value;
//   }

//   regenerateStory() {
//     let finalJson = [];
//     for (let i = 0; i < this.answerJson.length; i++) {
//       if (this.answerJson[i].answered == true) {
//         finalJson.push(this.answerJson[i]);
//       }
//     }
//     let reqJson = { index: this.journeyId, questions: finalJson }
//     this.stepperSubmitted = true;
//     this.storyService.generateStory(reqJson).subscribe(
//       (response) => {
//         if (response.body) {
//           this.genetatedStroy = response.body.story;
//           this.generatedKLP = response.body.klp;
//           this.generatedRisks = response.body.risk;
//           this.isVarified = response.body.verified;
//           this.stepperSubmitted = false;
//         }
//       });
//   }

 }
