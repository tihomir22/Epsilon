import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarActivosCompComponent } from '../componentes/agregar-activos-comp/agregar-activos-comp.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListadoOrdenesTransaccionesComponent } from '../listado-ordenes-transacciones/listado-ordenes-transacciones.component';


@NgModule({
  declarations: [AgregarActivosCompComponent, ListadoOrdenesTransaccionesComponent],
  entryComponents: [AgregarActivosCompComponent, ListadoOrdenesTransaccionesComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [AgregarActivosCompComponent, ListadoOrdenesTransaccionesComponent]
})
export class SharedModule { }
