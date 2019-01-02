import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarActivosPage } from './agregar-activos.page';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


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
    RouterModule.forChild(routes)
  ],
  declarations: [AgregarActivosPage]
})
export class AgregarActivosPageModule {}
