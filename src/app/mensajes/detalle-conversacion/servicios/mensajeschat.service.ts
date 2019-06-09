import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mensajeModel } from '../modelos/mensajeModel';

@Injectable({
  providedIn: 'root'
})
export class MensajeschatService {

  private baseURI: string = "http://dembow.gearhostpreview.com/";
  constructor(private http: HttpClient) {

  }


  public recibirMensajesComoEmisor(idActual: number, idAjeno: number): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "recuperar_mensajeria", "idActual": idActual, "idAjeno": idAjeno },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public recibirMensajesComoReceptor(idActual: number, idAjeno: number): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "recuperar_mensajeria", "idActual": idAjeno, "idAjeno": idActual },
      url: any = this.baseURI + "retrieve-data.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }


  public enviarMensaje(mensaje: mensajeModel): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "enviarMensaje",
        "idActual": mensaje.id_usuario_emisor,
        "idAjeno": mensaje.id_usuario_receptor,
        "fecha": mensaje.fecha,
        "mensaje": mensaje.mensaje,
        "visto": mensaje.visto,
      },
      url: any = this.baseURI + "manage-dataIONIC.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public leerMensaje(mensaje: mensajeModel): any {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "leerMensaje",
        "id": mensaje.id
      },
      url: any = this.baseURI + "manage-dataIONIC.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }

  public recuperarMensajesSinLeer(idUsuario: number): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "recuperar_mensajes_no_vistas_por_usuario",
        "id": idUsuario
      },
      url: any = this.baseURI + "retrieve-data.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }






}
