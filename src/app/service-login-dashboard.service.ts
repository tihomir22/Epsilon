import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpHeaders , HttpClient} from '@angular/common/http';

import { stringify } from '@angular/core/src/util';
import { Subject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { DashboardPage } from './dashboard/dashboard.page';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginDashboardService {

  private userInfo: any;
  private activo:any;
  private tipoAdquisicion:string='';
  private arrayActivosServ:Array<any>=new Array;
  private result:any;
  private baseURI               : string  = "http://dembow.gearhostpreview.com/";


  constructor(public http:HttpClient,public tostCtrl:ToastController) {}

  public setArrayActivos(array:any){
    this.arrayActivosServ=array;
  }
  public getArrayActivos(){
    return this.arrayActivosServ;
  }

  public setDestn(destn) {
    this.userInfo = destn;
  }

  getDestn() {
    return this.userInfo;
  }

  public setActivo(activo){
    this.activo=activo;
  }
  getActivo(){
    return this.activo;
  }

  public setTipoAdquisicion(tipo:string){
    this.tipoAdquisicion=tipo;
  }
  public getTipoAdquisicion(){
    return this.tipoAdquisicion;
  }
  public actualizarPrecioActivo(idActivo:any,precioLive:any){
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "actualizar_precio_activo", "id_activo" : idActivo, "precio_live" : precioLive },
      url       : any      	= this.baseURI + "manage-dataIONIC.php";
  

    this.http.post(url, JSON.stringify(options), headers)
    
    .subscribe((data : any) =>
    {
      // If the request was successful notify the user
      console.log(`Felicidades se ha modificado el activo correctamente`);
     // this.sendNotification("Actualizado con exito");
    },
    (error : any) =>
    {
      if(error.status==200){
        console.log('No se pudo modificar el activo! ');
      }else{
        console.log('Algo fue mal!' +JSON.stringify(options));
      }
    });
  }

  public eliminarRelacion(idRelacion:any){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= { "key" : "eliminar_relacion", "id_relacion" : idRelacion },
    url       : any      	= this.baseURI + "manage-dataIONIC.php";

  this.http.post(url, JSON.stringify(options), headers)
  
  .subscribe((data : any) =>
  {
    // If the request was successful notify the user
    console.log(`Felicidades se ha eliminado exitosamente la relacion`);
    this.sendNotification("Activo eliminado con exito del usuario");

  },
  (error : any) =>
  {
    if(error.status==200){
      console.log('No se pudo modificar el activo! ');
    }else{
      console.log('Algo fue mal!' +JSON.stringify(options));
    }
  });
}
async sendNotification(message : string)
{
   let toast = await this.tostCtrl.create({
       message       : message,
       duration      : 3000
   });
   toast.present();
}
 

  public logOutMethod(){
    this.userInfo=null;
    this.activo=null;
    this.tipoAdquisicion=null;
  }


  

}
