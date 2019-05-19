import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exchangeClass } from '../modales/gestion-api/modelos/exchangeClass';
import { ServiceLoginDashboardService } from './service-login-dashboard.service';
import { apiInterfaz } from '../modales/vista-rapida-api/models/apiInterfaz';
import { ActivoBalanceInterface } from '../modales/gestion-api/modelos/ActivoBalanceInterface';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  private baseURI: string = "http://dembow.gearhostpreview.com/";
  private infoUsuario: Object;
  private apiSeleccioanda: apiInterfaz;
  private parametrosSeleccionados: any;
  public listaApisIniciales: Array<apiInterfaz> = [];

  constructor(private http: HttpClient, private service: ServiceLoginDashboardService) {
    this.infoUsuario = this.service.getDestn();
  }
  public setApi(api: apiInterfaz) {
    this.apiSeleccioanda = api;
  }
  public getApi() {
    return this.apiSeleccioanda;
  }
  public getListUserApis(): Array<apiInterfaz> {
    return this.listaApisIniciales;
  }

  public setParametros(item: any) {
    this.parametrosSeleccionados = item;
  }
  public getParametros() {
    return this.parametrosSeleccionados;
  }


  public obtenerBalanceBinance(json: any): Observable<any> {
    // console.log("vamos a enviar ", json)

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "conectar_binance", "json": json, "id": this.service.getDestn().idepsilon_usuarios },
      url: any = this.baseURI + "apis/Binance/index.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }
  public devolverPaquete(apiKey: string, privateKey): any {
    //console.log(apiKey + "\n" + privateKey)
    let json =
    {
      "api-key": apiKey,
      "api-secret": privateKey,
      "curlOpts": {
        "CURLOPT_SSL_VERIFYPEER": 0,
        "INVALID_CONSTANT_NAME": 42
      }
    }
    return json

  }

  public getTodosLosExchanges(): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "recuperar_all_exchanges" },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public guardarClaveAPI(apiKey: string, privateKey: string, name: string, idExchange: number) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "anyadir_claves_api_a_usuario", "idUsuario":  this.service.getDestn().idepsilon_usuarios, "apikey": apiKey, "privatekey": privateKey, "name": name, "idExchange": idExchange },
      url: any = this.baseURI + "manage-dataIONIC.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public modificarClaveApi(idClaveApi: number, apiKey: string, privateKey: string, name: string) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "modificar_clave_api", "idClaveApi": idClaveApi, "apikey": apiKey, "privatekey": privateKey, "name": name },
      url: any = this.baseURI + "manage-dataIONIC.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public eliminarClaveApi(idClaveApi: number) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "eliminar_clave_api", "idClaveApi": idClaveApi },
      url: any = this.baseURI + "manage-dataIONIC.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }


  public recuperarClavesAPI(apiKey: string, privateKey: string, name: string) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "buscar_claves_en_bbdd", "idUsuario": this.service.getDestn().idepsilon_usuarios, "apikey": apiKey, "privatekey": privateKey },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public recuperarClavesAPIbyIDUSER(idUsuario: number): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "buscar_claves_en_bbdd_por_id_usuario", "idUsuario": idUsuario },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public recuperarImagenesAPartirDeSiglas(siglas: string) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "recuperar_img_a_partir_de_nombre", "nombre_imagen": siglas },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public recuperarPrecioActivo(json: any, base: string, contraparte: string) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "recuperar_precio", "json": json, "base": base, "contraparte": contraparte, "id": this.service.getDestn().idepsilon_usuarios },
      url: any = this.baseURI + "apis/Binance/index.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }

  /**
   * $quantity = 1;
$price = 0.0005;
$order = $api->buy("BNBBTC", $quantity, $price);
   */

  public placeMARKETbuy(json: any, cantidad: any, precio: number, base: string, contraparte: string) {
    let parsed = parseInt(cantidad)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "market_buy", "json": json, "base": base, "cantidad": parsed, "precio": precio, "contraparte": contraparte, "id": this.service.getDestn().idepsilon_usuarios },
      url: any = this.baseURI + "apis/Binance/index.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }



  public placeMARKETsell(json: any, cantidad: any, precio: number, base: string, contraparte: string) {
    let parsed = parseInt(cantidad)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "market_sell", "json": json, "base": base, "cantidad": parsed, "precio": precio, "contraparte": contraparte, "id": this.service.getDestn().idepsilon_usuarios },
      url: any = this.baseURI + "apis/Binance/index.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }

  public placeLIMITbuy(json: any, cantidad: any, precio: number, base: string, contraparte: string) {
    let parsed = parseInt(cantidad)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "limit_buy", "json": json, "base": base, "cantidad": parsed, "precio": precio, "contraparte": contraparte, "id": this.service.getDestn().idepsilon_usuarios },
      url: any = this.baseURI + "apis/Binance/index.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }
  public placeLIMITsell(json: any, cantidad: any, precio: number, base: string, contraparte: string) {
    let parsed = parseInt(cantidad)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "limit_sell", "json": json, "base": base, "cantidad": parsed, "precio": precio, "contraparte": contraparte, "id": this.service.getDestn().idepsilon_usuarios },
      url: any = this.baseURI + "apis/Binance/index.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }

  public getPreciosYSimbolos(json: any) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "symbols_and_prices", "json": json, "id": this.service.getDestn().idepsilon_usuarios },
      url: any = this.baseURI + "apis/Binance/index.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }

  public consultarTransaccionesHistoricasParaUnSimbolo(json: any, simbolo: string) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "transacciones_historicas_simbolo", "json": json, "simbolo": simbolo, "id": this.service.getDestn().idepsilon_usuarios },
      url: any = this.baseURI + "apis/Binance/index.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }

  public cancelarOrden(json: any, parcompleto: string, orden: string) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "detener_orden", "json": json, par: parcompleto, ordenid: orden, "id": this.service.getDestn().idepsilon_usuarios },
      url: any = this.baseURI + "apis/Binance/index.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }



}
