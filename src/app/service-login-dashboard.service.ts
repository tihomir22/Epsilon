import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginDashboardService {

  private destn: any;
  private activo:any;
  private tipoAdquisicion:string='';

  constructor() {}

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
}
