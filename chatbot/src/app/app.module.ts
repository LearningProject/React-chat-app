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
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,

} from '@angular/cdk/drag-drop';
import { AlertComponentComponent } from './shared/components/alert-component/alert-component.component';
import {HomeComponent} from './shared/components/home/home.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { KLPComponent } from './shared/components/klp/klp.component';
//import { KLPComponent } from './shared/component/klp/klp.component'

@NgModule({
  declarations: [AppComponent, HelpSupportComponent, RiskMenuComponent, AlertComponentComponent,HomeComponent, ProgressBarComponent,KLPComponent],
  imports: [
    MatCardModule, MatButtonModule,MatDialogModule,MatProgressBarModule,
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
