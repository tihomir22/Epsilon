import { Component, OnInit, ViewChildren, ElementRef, QueryList, Renderer2, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import Typed from 'typed.js';
@Component({
  selector: 'app-carga-modal',
  templateUrl: './carga-modal.component.html',
  styleUrls: ['./carga-modal.component.scss']
})
export class CargaModalComponent implements OnInit {

  @ViewChild('palabra') palabra: ElementRef;
  public arrayStrings = ['Cargando datos de usuario.', 'Cargando notificaciones programadas.', 'Cargando activos.', 'Cargando modulos.', 'Cargando shitcoins.', 'Pagando comision a Bitconnect de los fondos del usuario', 'Conectando con el sistema', 'Hey hey heeeeeeeeeey…. Hey hey heeeeeeeeeey…. Hey hey heeeeeeeeeey', 'Organizando el dashboard']


  constructor(private renderer: Renderer2) {

  }

  ngOnInit() {
    const options = {
      strings: this.generarArrayChungo(),
      typeSpeed: 50,
      backSpeed: 30,
      showCursor: true,
      cursorChar: '|',
      loop: true
    };

    const typed = new Typed('.typed-element-dembow', options);


  }

  private generarArrayChungo(): Array<any> {
    let res = [];
    let length = this.arrayStrings.length;

    for (let i = 0; i < length; i++) {
      const element = Math.floor(Math.random() * this.arrayStrings.length)
      res.push(this.arrayStrings[element])
      this.arrayStrings.splice(element, 1);
    }
    console.log(res)
    return res;
  }

}
