import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Constantes } from 'src/Constantes';

@Component({
  selector: 'app-popover-opciones',
  templateUrl: './popover-opciones.component.html',
  styleUrls: ['./popover-opciones.component.scss']
})
export class PopoverOpcionesComponent implements OnInit {
  public balance=Constantes.balance;
  public realizarTransaccion=Constantes.realizarTransaccion;
  public listadoTransaccion=Constantes.listadoTransaccion;
  
  constructor(private popover: PopoverController,private router:Router) { }

  ngOnInit() {
  }
  public eligirItem(itemElegido: string): void {
    this.popover.dismiss();
    this.router.navigate(["/plantilla-api"],{queryParams:{tipo:itemElegido}})
    console.log(itemElegido)
  }

}
