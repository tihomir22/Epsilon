import { Component, OnInit } from '@angular/core';
import {ServiceLoginDashboardService} from '../service-login-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  data:any;

  constructor(public service:ServiceLoginDashboardService) { 
    this.data=this.service.getDestn();
  }

  ngOnInit() {
  }

}
