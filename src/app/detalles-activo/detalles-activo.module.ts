import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesActivoPage } from './detalles-activo.page';
import { MatDividerModule, MatTabsModule, MatListModule, MatIconModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: DetallesActivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetallesActivoPage]
})
export class DetallesActivoPageModule {}
