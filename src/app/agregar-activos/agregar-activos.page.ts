import { Component, OnInit } from '@angular/core';
import { ServiceLoginDashboardService } from '../service-login-dashboard.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-activos',
  templateUrl: './agregar-activos.page.html',
  styleUrls: ['./agregar-activos.page.scss'],
})
export class AgregarActivosPage implements OnInit {

  data:any;
  activos_cripto:Array<any>=new Array;
  activos_stock:Array<any>=new Array;
 
  private baseURI               : string  = "http://dembow.gearhostpreview.com/";


  constructor(public service:ServiceLoginDashboardService,public http:HttpClient,public toastCtrl:ToastController,public navCtrl:NavController) {
    this.data=service.getDestn();
  }

  ngOnInit() {
    this.cargarActivos();
  }
  cargarActivos(){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= { "key" : "todos_activos"},
    url       : any      	= this.baseURI + "retrieve-data.php";

    this.http
    .post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>
    {
       console.dir(data);
       if(data==null || data==false){
        this.sendNotification("No existen activos...");
       }else{
        this.sendNotification(data);
        this.clasificarResultado(data);
        //this.activos_cripto=data;
       
       }
    },
    (error : any) =>
    {
      this.sendNotification("Hubo un error inesperado...");
    });
  }
 
  generarImgCripto(activo){
     return this.baseURI+"img-activos/"+activo.nombre+".png";
  }
  generarImgStock(activo){
    return this.baseURI+"img-activos-stocks/"+activo.nombre+".png";
 }
  clasificarResultado(data:any){
    data.forEach(element => {
      if (element.tipo=="Criptomoneda") {
        this.activos_cripto.push(element);
      }
      if(element.tipo=="Stock"){
        this.activos_stock.push(element);
      }
    });
    
  }
  buscar(){
    console.dir("vamos a buscar loco");
  }
  dejarDeBuscar(){
    console.dir("dejemos de buscar wey");
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
