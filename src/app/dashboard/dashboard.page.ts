import { Component, OnInit } from '@angular/core';
import {ServiceLoginDashboardService} from '../service-login-dashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  data:any;
  private hayActivos:boolean=false;

  /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */
   private baseURI               : string  = "http://dembow.gearhostpreview.com/";

  constructor(public service:ServiceLoginDashboardService,public http:HttpClient,public toastCtrl:ToastController,public navCtrl:NavController) { 
    this.data=this.service.getDestn();


  }

  ngOnInit() {
    this.cargarActivos();
  }

  cargarActivos(){
    
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "activos","id_usuario" : this.data.idepsilon_usuarios},
      url       : any      	= this.baseURI + "retrieve-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         console.dir(data);
         if(data==null || data==false){
          this.sendNotification("No tiene activos el usuario...");
          this.hayActivos=false;
         }else{
          this.sendNotification(data);
          this.hayActivos=true;
         }
      },
      (error : any) =>
      {
        this.sendNotification("Hubo un error inesperado...");
        this.hayActivos=false;
      });
  }

  agregarNuevosActivos(){
    this.navCtrl.navigateForward("/agregar-activos");
  }
  async sendNotification(message : string)
   {
      let toast = await this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      toast.present();
   }

}
