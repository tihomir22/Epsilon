import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlantillaAPIPage } from './plantilla-api.page';
import { BalancesApiComponent } from '../componentes/balances-api/balances-api.component';
import { BarChartComponent } from '../componentes/bar-chart/bar-chart.component';
import { RealizarTransaccionBinanceComponent } from '../componentes/realizar-transaccion-binance/realizar-transaccion-binance.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule, MatListModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: PlantillaAPIPage
  }
];

@NgModule({
  declarations: [PlantillaAPIPage, BalancesApiComponent, BarChartComponent, RealizarTransaccionBinanceComponent],
  entryComponents: [BalancesApiComponent, BarChartComponent, RealizarTransaccionBinanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatListModule,
    SharedModule
  ],
  exports: [BalancesApiComponent, BarChartComponent]

})
export class PlantillaAPIPageModule { }
