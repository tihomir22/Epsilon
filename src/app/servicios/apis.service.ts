import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exchangeClass } from '../modales/gestion-api/modelos/exchangeClass';
import { ServiceLoginDashboardService } from './service-login-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  private baseURI: string = "http://dembow.gearhostpreview.com/";
  private infoUsuario:Object;

  constructor(private http: HttpClient,private service:ServiceLoginDashboardService) { 
    this.infoUsuario=service.getDestn();
  }


  public obtenerBalanceBinance(json:any) {
    console.log("vamos a enviar ",json)

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "conectar_binance", "json": json },
      url: any = this.baseURI + "apis/Binance/index.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }
  
  public getTodosLosExchanges():Observable<any>{
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "recuperar_all_exchanges" },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public guardarClaveAPI(apiKey:string,privateKey:string,name:string){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "anyadir_claves_api_a_usuario","idUsuario":this.infoUsuario['idepsilon_usuarios'],"apikey":apiKey,"privatekey":privateKey,"name":name },
      url: any = this.baseURI + "manage-dataIONIC.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public recuperarClavesAPI(apiKey:string,privateKey:string,name:string){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "buscar_claves_en_bbdd","idUsuario":this.infoUsuario['idepsilon_usuarios'],"apikey":apiKey,"privatekey":privateKey },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

}
