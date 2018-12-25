import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarActivosPage } from './agregar-activos.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarActivosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgregarActivosPage]
})
export class AgregarActivosPageModule {}
