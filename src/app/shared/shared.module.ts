import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarActivosCompComponent } from '../componentes/agregar-activos-comp/agregar-activos-comp.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicStepperModule } from 'ionic-stepper';


@NgModule({
  declarations: [AgregarActivosCompComponent],
  entryComponents: [AgregarActivosCompComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [AgregarActivosCompComponent]
})
export class SharedModule { }
