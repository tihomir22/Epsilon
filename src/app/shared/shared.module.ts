import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarActivosCompComponent } from '../componentes/agregar-activos-comp/agregar-activos-comp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListadoOrdenesTransaccionesComponent } from '../listado-ordenes-transacciones/listado-ordenes-transacciones.component';
import { DetalleConversacionComponent } from '../mensajes/detalle-conversacion/detalle-conversacion.component';
import { MatInputModule, MatIconModule } from '@angular/material';


@NgModule({
  declarations: [AgregarActivosCompComponent, ListadoOrdenesTransaccionesComponent, DetalleConversacionComponent],
  entryComponents: [AgregarActivosCompComponent, ListadoOrdenesTransaccionesComponent, DetalleConversacionComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule, ReactiveFormsModule, MatIconModule
  ],
  exports: [AgregarActivosCompComponent, ListadoOrdenesTransaccionesComponent, DetalleConversacionComponent]
})
export class SharedModule { }
