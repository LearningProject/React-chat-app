import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { RiskMenuComponent } from './shared/components/risk-menu/risk-menu.component';
import { KLPComponent } from './shared/components/klp/klp.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'risk', component: RiskMenuComponent },
  { path: 'klp', component: KLPComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
