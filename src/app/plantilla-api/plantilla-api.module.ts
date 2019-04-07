import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlantillaAPIPage } from './plantilla-api.page';
import { BalancesApiComponent } from '../componentes/balances-api/balances-api.component';
import { BarChartComponent } from '../componentes/bar-chart/bar-chart.component';


const routes: Routes = [
  {
    path: '',
    component: PlantillaAPIPage
  }
];

@NgModule({
  declarations: [PlantillaAPIPage,BalancesApiComponent,BarChartComponent],
  entryComponents:[BalancesApiComponent,BarChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports:[BalancesApiComponent,BarChartComponent]
 
})
export class PlantillaAPIPageModule {}
