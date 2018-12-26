import { Component, OnInit } from '@angular/core';
import { ServiceLoginDashboardService } from '../service-login-dashboard.service';

@Component({
  selector: 'app-detalles-activo',
  templateUrl: './detalles-activo.page.html',
  styleUrls: ['./detalles-activo.page.scss'],
})
export class DetallesActivoPage implements OnInit {
  activo:any;
  constructor(private service:ServiceLoginDashboardService) { 
    this.activo=service.getActivo();
  }

  ngOnInit() {

  }

}
