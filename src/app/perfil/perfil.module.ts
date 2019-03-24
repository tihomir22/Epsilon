import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { GraficoAComponent } from './grafico-a/grafico-a.component';
import { GraficoBComponent } from './grafico-b/grafico-b.component';
import { ConexionesComponent } from './conexiones/conexiones.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilPage, GraficoAComponent, GraficoBComponent, ConexionesComponent]
})
export class PerfilPageModule {}
