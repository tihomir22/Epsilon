import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MensajesPage } from './mensajes.page';
import { MatListModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MensajesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [MensajesPage],
  entryComponents: []
})
export class MensajesPageModule { }
