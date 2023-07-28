import { Component, ElementRef, Input, OnInit,ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Location } from '@angular/common';
import { NavigationEnd } from "@angular/router";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-klp',
  templateUrl: './klp.component.html',
  styleUrls: ['./klp.component.scss'],

})

export class KLPComponent implements OnInit {
  @Input() risk_kpl: any;
  data: any = [];
  background: ThemePalette = 'primary';
  injector: any;
  state$: Observable<any> | undefined;
  story: any;
  private history: string[] = [];
  messages: any;
  riskStory: string = '';

  constructor(public activatedRoute: ActivatedRoute, private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      // console.log('params is',JSON.parse(this.activatedRoute.snapshot.paramMap.get('messages'))|| '{}');
      this.data = params.getAll('list');
      this.story = params.getAll('story');
      console.log('params', params.get('messages'));
      this.messages = JSON.parse(params.get('messages') || '{}');
    });
  }

  
  // public exportPDF() {
  //   const doc = new jsPDF();
   
  //   const pdfTable = this.pdfTable!.nativeElement;
   
  //   var html = htmlToPdfmake(pdfTable.innerHTML);
     
  //   const documentDefinition = { content: html };
  //   pdfMake.createPdf(documentDefinition).download(); 
     
  // }
  public exportPDF(): void {
    let DATA: any = document.getElementById('pdfTable');
    html2canvas(DATA,{scale:2}).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      console.log('canvas',canvas);
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm','a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //  PDF.addImage(FILEURI, 'PNG', 0, 0, 29.7, 21.0);
      PDF.save('klp.pdf');
    });
  

		
  
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/risk");
    }
  }
  displayStory(param: any) {
    if (param.domain !== 'Financial Risk') {
      this.riskStory = 'Title of the Story "Financial Risk"\
       Departure from the Air Force:\
      Once upon a time, in a small town, there lived a young man named Alex. He had always dreamt of serving in the Air Force, soaring through the skies with unwavering pride. At the age of 18, he enlisted in the military and embarked on an extraordinary journey.\
      The Price of Sacrifice:\
      During his time in the Air Force, Alex encountered a physical injury that hindered his ability to continue serving. Despite his deep love for his country, he had to make the difficult decision to leave the military at the tender age of 21. The transition was emotionally challenging, as he had to face the reality of leaving behind the life he had always known.\
      A Broken Heart:\
      In addition to his military departure, Alex was also going through a heart-wrenching breakup with his long-term partner, Sarah. The strain of distance and the demanding nature of military life had taken its toll on their relationship, leading to an inevitable parting of ways. The combination of leaving the Air Force and the end of a significant relationship left Alex feeling lost and uncertain about his future.\
      The Struggles of Unemployment: \nFinding himself thrust into the civilian world earlier than expected, Alex faced the harsh reality of unemployment. Without a clear career path or support network, he was left grappling with feelings of purposelessness. Despite his dedication and skills acquired in the Air Force, securing a job became a daunting challenge.\
      Lingering Shadows: \nAs time went by, Alex realized that leaving the Air Force early had left him vulnerable in unexpected ways. His access to military systems or accounts had not been properly terminated, exposing him to potential unauthorized access. Fearing the consequences of this oversight, he decided to take action and protect his privacy.\
      A Beacon of Hope:\nDriven by his resilience and determination, Alex sought assistance to rectify the issue. He updated his resume and online profiles, emphasizing his skills, discipline, and adaptability gained from his military experience. While navigating the treacherous waters of unemployment, he remained vigilant against phishing emails, carefully scrutinizing every communication that came his way.';
    } else {
      this.riskStory ='"Fragile Trust: Guarding the Embers of Identity" follows the story of Sergeant Emily Thompson, a dedicated servicemember transitioning out of the armed forces. As she adjusts to civilian life, she receives alarming news of a potential breach of personal identifiable information (PII) stored within military databases.\
       Fueled by concern for her fellow servicemembers, Sergeant Thompson embarks on a quest to understand the extent of the breach. Collaborating with cybersecurity experts and fellow veterans, she unveils the true scope of the data breach, revealing that sensitive PII is at risk of unauthorized access. Determined to protect her comrades-in-arms, Sergeant Thompson becomes an advocate for enhanced information security measures.\
        Her efforts lead to the implementation of robust safeguards within the military, empowering servicemembers to protect their identities. Through her resilience, Sergeant Thompson not only rebuilds trust in the military ability to safeguard PII but also becomes a guiding light for others, ensuring the sanctity of their identities and preserving the trust bestowed upon military institutions.';
    
    }

  }
  // downloadPdf(pdfUrl: string, pdfName: string ) {
  //   //const pdfUrl = './assets/sample.pdf';
  //   //const pdfName = 'your_pdf_file';
  //   FileSaver.saveAs(pdfUrl, pdfName);
  // }

}

