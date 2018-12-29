import { Component, OnInit } from '@angular/core';
import {ServiceLoginDashboardService} from '../service-login-dashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, MenuController } from '@ionic/angular';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  data:any;
  relaciones:Array<any>=new Array;
  arrayActivos:Array<any>=new Array;
  arrayActivosLive:Array<any>=new Array;
  public obj:any;
  private hayActivos:boolean=false;
  

  /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */
   private baseURI               : string  = "http://dembow.gearhostpreview.com/";

  constructor(public menuCtrl:MenuController,public service:ServiceLoginDashboardService,public http:HttpClient,public toastCtrl:ToastController,public navCtrl:NavController) { 
    
    this.data=this.service.getDestn();
    this.cargarActivos();
    this.menuCtrl.enable(true);
    
  }

  ngOnInit() {
    console.dir("me he iniciado")

  }

  ngAfterViewChecked(){
   
  }
  
    

  cargarActivos(){
    
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "activos","id_usuario" : this.data.idepsilon_usuarios},
      url       : any      	= this.baseURI + "retrieve-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         if(data==null || data==false){
          this.sendNotification("No tiene activos el usuario...");
          this.hayActivos=false;
         }else{
        //  this.sendNotification(data);
          this.hayActivos=true;
          console.dir(data);
          data.forEach(relacion => {
            this.relaciones.push(relacion);
            this.recuperarActivo(relacion.id_activo_ajeno,relacion.siglas_operacion);
            
          });
          
          
         }
      },
      (error : any) =>
      {
        this.sendNotification("Hubo un error inesperado...");
        this.hayActivos=false;
      });
  }
    recuperarActivo(id:any,siglas:any){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= { "key" : "recuperar_activo","id_activo" : id},
    url       : any      	= this.baseURI + "retrieve-data.php";
    console.dir(id);
    this.http
    .post(url, JSON.stringify(options), headers)
    .subscribe((activoRec : any) =>
    {
       if(activoRec==null || activoRec==false){
        this.sendNotification("No se encuentra el activo");
       }else{
        
        if(activoRec.tipo=="Criptomoneda"){
          this.recuperarPrecioCryptoCompare(activoRec.siglas,siglas).subscribe(response=>{
            var obj:any=response;
            console.dir(obj[activoRec.siglas][siglas]);
            this.arrayActivosLive.push(obj[activoRec.siglas][siglas]);
          });
          this.arrayActivos.push(activoRec);        
        }
       }
    },
    (error : any) =>
    {
      this.sendNotification("Hubo un error inesperado...");
    });
  }

  public  recuperarPrecioCryptoCompare(siglasActivo:string,siglasContrapartida:string){
   
    return  this.http.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms="+ siglasActivo +"&tsyms="+siglasContrapartida+"&api_key=6df543455629ca3d59e3d3a38cc6b7db7a922fdfbf6005e9b8c0a126731374cc");
    
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

   getPrecioCompra(activo:any){
    this.relaciones.forEach(relacion => {
      if(relacion.id_activo_ajeno==activo.id){
        return relacion.precio_compra;
      }
    });
   }

   generarImgCripto(activo){
    return this.baseURI+"img-activos/"+activo.nombre+".png";
 }
 generarImgStock(activo){
   return this.baseURI+"img-activos-stocks/"+activo.nombre+".png";
}
 
}   


