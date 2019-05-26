import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertModelInterface } from '../alertas/modelo/alertModel';
import { Observable } from 'rxjs';
import { ServiceLoginDashboardService } from './service-login-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseURI: string = "http://dembow.gearhostpreview.com/";
  public arrayNotificaciones: Array<AlertModelInterface>;

  constructor(private http: HttpClient,
    private servicioLogin: ServiceLoginDashboardService) {

  }

  public guardarNotificacion(notificacion: AlertModelInterface, simboloBASE: string, simboloCONTRA: string, parametro: any, parametro2?: any, parametro3?: any, subitems?: string): Observable<any> {
    if (subitems == undefined) {
      subitems = ''
    }
    console.log(subitems)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "guardarNotificacion",
        "id_usuario": this.servicioLogin.getDestn().idepsilon_usuarios,
        "numero": notificacion.numero,
        "titulo": notificacion.title,
        "tipo": notificacion.tipo,
        "subtipo": notificacion.subtipo,
        "time": notificacion.tiempo_segundos,
        "simbolo_base": simboloBASE,
        "simbolo_contra": simboloCONTRA,
        "parametro": parametro,
        "parametro2": parametro2,
        "parametro3": parametro3,
        "subitems": subitems
      },
      url: any = this.baseURI + "manage-dataIONIC.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }

  public eliminarNotificacion(numero: number): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "eliminar_notificacion",
        "id_usuario": this.servicioLogin.getDestn().idepsilon_usuarios,
        "numero": numero
      },
      url: any = this.baseURI + "manage-dataIONIC.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }


  public getAll(): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "get_all_notification",
        "id_usuario": this.servicioLogin.getDestn().idepsilon_usuarios
      },
      url: any = this.baseURI + "retrieve-data.php";
    return this.http.post(url, JSON.stringify(options), headers)
  }

  public setNotificacionesActuales(array: Array<AlertModelInterface>) {
    this.arrayNotificaciones = array;
  }

  public getNotificacionesActuales(): Array<AlertModelInterface> {
    return this.arrayNotificaciones;
  }

}
