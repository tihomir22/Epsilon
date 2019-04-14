import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarActivosPage } from './agregar-activos.page';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgregarActivosCompComponent } from '../componentes/agregar-activos-comp/agregar-activos-comp.component';
import { SharedModule } from '../shared/shared.module';


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
    HttpModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AgregarActivosPage],
  entryComponents: []
})
export class AgregarActivosPageModule { }
