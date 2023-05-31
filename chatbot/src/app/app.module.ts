import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpSupportComponent } from './shared/components/help-support/help-support.component';
import { RiskMenuComponent } from './shared/components/risk-menu/risk-menu.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgFor} from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AppComponent, HelpSupportComponent, RiskMenuComponent],
  imports: [
    MatCardModule, MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,MatFormFieldModule,MatInputModule,CdkDropListGroup, CdkDropList, NgFor, CdkDrag
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
