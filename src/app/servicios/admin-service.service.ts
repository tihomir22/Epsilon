import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '../perfil/class/UsuarioInterface';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private baseURI: string = "http://dembow.gearhostpreview.com/";
  private appPages: Array<any> = [];

  constructor(private http: HttpClient) { }

  public obtenertop100(): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "obtener_100" },
      url: any = this.baseURI + "admin.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public obtenerUsuarios(idUsuario: number): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "obtener_usuarios", "idUsuario": idUsuario },
      url: any = this.baseURI + "admin.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public actualizarUsuario(user: UsuarioInterface): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "actualizar_usuario_privilegio", "idUsuario": user.idepsilon_usuarios, "privilegio": user.privilegios, "estado": user.estado },
      url: any = this.baseURI + "admin.php";

    return this.http.post(url, JSON.stringify(options), headers)
  }

  public setAppPages(appPages: Array<any>) {
    this.appPages = appPages;
  }
  public getAppPages(): Array<any> {
    return this.appPages;
  }
}
