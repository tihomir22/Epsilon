import { Component, OnInit } from '@angular/core';
import { ServiceLoginDashboardService } from '../service-login-dashboard.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'app-agregar-activos',
  templateUrl: './agregar-activos.page.html',
  styleUrls: ['./agregar-activos.page.scss'],
})
export class AgregarActivosPage implements OnInit {
  data:Array<any>=new Array;
  
  searchTerm:string;

  copiaData:Array<any>=new Array;
  activos_cripto:Array<any>=new Array;
  activos_stock:Array<any>=new Array;
  searching: any = false;
  

  private baseURI               : string  = "http://dembow.gearhostpreview.com/";


  constructor(public service:ServiceLoginDashboardService,public http:HttpClient,public toastCtrl:ToastController,public navCtrl:NavController,public loadingCtrl: LoadingController) {
    this.data=service.getDestn();
    
  }

  ngOnInit() {
    this.cargarActivos();
   
  }
 
 
  filtrarActivos(){
    this.searching=true;
    let array:Array<any>=new Array;
    this.copiaData.forEach(element => {
      let nombre:string=element.nombre;
      console.dir(nombre);
      if(nombre.toLocaleLowerCase().includes(this.searchTerm)){
        console.dir(nombre + " contiene "+ this.searchTerm);
        array.push(element);
      }
    });
    console.dir(array.length);
    this.clasificarResultado(array);
    
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
    if(this.copiaData.length==0){
      this.copiaData=data;
    }
    if(this.activos_cripto.length>0){
      this.activos_cripto.length=0;
    }
    if(this.activos_stock.length>0){
      this.activos_stock.length=0;
    }
    this.data=data;
    data.forEach(element => {
      if (element.tipo=="Criptomoneda") {
        this.activos_cripto.push(element);
      }
      if(element.tipo=="Stock"){
        this.activos_stock.push(element);
      }
    });
    this.searching=false;
  }
  abrirDetalles(activo:any){
    this.service.setActivo(activo);
    this.navCtrl.navigateForward("/detalles-activo");
    console.dir(activo.nombre);
  }
  buscar(){
    console.dir("vamos a buscar loco"+ this.searchTerm);
  }
  dejarDeBuscar(){
    console.dir("dejemos de buscar wey "+ this.searchTerm);
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
