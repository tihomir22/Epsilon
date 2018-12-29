import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpHeaders , HttpClient} from '@angular/common/http';

import { stringify } from '@angular/core/src/util';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginDashboardService {

  private destn: any;
  private activo:any;
  private tipoAdquisicion:string='';
  private result:any;


  constructor(public http:HttpClient) {}

  public setDestn(destn) {
    this.destn = destn;
  }

  getDestn() {
    return this.destn;
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
  
 

  public logOutMethod(){
    this.destn=null;
    this.activo=null;
    this.tipoAdquisicion=null;
  }

  

}
