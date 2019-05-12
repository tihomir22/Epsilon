import { Component, OnInit, Output } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { EventEmitter } from 'protractor';
import { AlertModelInterface } from '../../modelo/alertModel';
import { NotificationService } from 'src/app/servicios/notification.service';

@Component({
  selector: 'app-notificaciones-lista-comp',
  templateUrl: './notificaciones-lista-comp.component.html',
  styleUrls: ['./notificaciones-lista-comp.component.scss']
})
export class NotificacionesListaCompComponent implements OnInit {
  public arrayNotificaciones: Array<any>;
  constructor(public navParams: NavParams,
    private notification: NotificationService) {
    this.arrayNotificaciones = this.navParams.get('arrayNotificaciones');
  }

  ngOnInit() {
  }

  public desactivarNotificacion(alerta: AlertModelInterface) {
    alerta.observable.unsubscribe();
    this.notification.eliminarNotificacion(alerta.numero).subscribe((data) => {
      console.log(data)
    })
    this.arrayNotificaciones.splice(this.arrayNotificaciones.indexOf(alerta), 1)
  }



}
