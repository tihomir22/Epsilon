import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ServiceLoginDashboardService } from './service-login-dashboard.service';
import { Observable, from } from 'rxjs';
import { of } from 'rxjs';
import { Noticia } from './noticias/clases/noticiaClass';

@Injectable({
  providedIn: 'root'
})
export class NoticiasSSService {

  private arrayActivosUsuario: Array<any> = new Array;
  private noticiasStockUsuario: any;
  private baseURI: string = "http://dembow.gearhostpreview.com/";

  constructor(public servicio: ServiceLoginDashboardService, public http: HttpClient) {
    this.arrayActivosUsuario = this.recuperarListaActivosUsuario();
  }

  private recuperarListaActivosUsuario() {
    return this.servicio.getArrayActivos();
  }
  public getArrayActivosUsuario() {
    return this.recuperarListaActivosUsuario();
  }
  public recuperarNoticiaDeActivo(siglas: String) {
    return this.http.get("https://min-api.cryptocompare.com/data/v2/news/?lang=EN&feeds=cointelegraph&categories=" + siglas + "&excludeCategories=Sponsored&api_key=6df543455629ca3d59e3d3a38cc6b7db7a922fdfbf6005e9b8c0a126731374cc");

  }

  public recuperarNoticiaDeActivos(siglas: Array<String>) {
    var res = '';
    siglas.forEach(element => {
      res = res + "," + element;
    });

    return this.http.get("https://min-api.cryptocompare.com/data/v2/news/?lang=EN&feeds=cointelegraph&categories=" + res + "&excludeCategories=Sponsored&api_key=6df543455629ca3d59e3d3a38cc6b7db7a922fdfbf6005e9b8c0a126731374cc");
  }

  public recuperarNoticiaDeActivoStock(siglasActivo: Array<any>) {
    // return this.http.get("https://api.iextrading.com/1.0/stock/" + siglasActivo + "/news/last")

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "recuperar_noticias_array_stock", "array": siglasActivo },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)


  }
  public cargarNoticias(tipo: string, activos: any) {
    if (tipo === "Criptomoneda") {
      return this.recuperarNoticiaDeActivos(activos);
    } else if (tipo === "Stock") {
      return this.recuperarNoticiaDeActivoStock(activos);
    }
  }
  public subirNoticiaFavoritaServidor(noticia: Noticia) {
    console.log(this.servicio.getDestn());

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "anadir_noticia_favorita_usuario", "noticia": noticia, "id_usuario": this.servicio.getDestn()['idepsilon_usuarios'] },
      url: any = this.baseURI + "manage-dataIONIC.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public recuperarNoticiaFavoritaServidor() {
    console.log(this.servicio.getDestn());

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "recuperar_noticias_favorita_usuario","id_usuario": this.servicio.getDestn()['idepsilon_usuarios'] },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }


}
