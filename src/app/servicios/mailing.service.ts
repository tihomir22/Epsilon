import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MailingService {

  constructor(private http: HttpClient) { }

  private baseURI: string = "http://dembow.gearhostpreview.com/";

  public cambiarContrasenyaYEnviarEmailAviso(id_usuario: number, nuevaContrasenya: string,email:string): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "enviar_email", "usuario_id": id_usuario, "pass": nuevaContrasenya,"email":email },
      url: any = this.baseURI + "mailing/mailing.php";

    return this.http.post(url, JSON.stringify(options), headers)

  }

}
