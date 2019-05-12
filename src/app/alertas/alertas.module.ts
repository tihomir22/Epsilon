import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlertasPage } from './alertas.page';
import { NotificacionesListaCompComponent } from './componentes/notificaciones-lista-comp/notificaciones-lista-comp.component';
import { EMAmodalComponent } from '../componentes/graficosTecnicos/smamodal/emamodal.component';
import { MatListModule, MatPaginatorModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: AlertasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatPaginatorModule

  ],
  declarations: [AlertasPage, NotificacionesListaCompComponent, EMAmodalComponent],
  entryComponents: [NotificacionesListaCompComponent, EMAmodalComponent]
})
export class AlertasPageModule { }
