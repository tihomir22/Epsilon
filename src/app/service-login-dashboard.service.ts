import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginDashboardService {

  private destn: any;
  private activo:any;

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
}
