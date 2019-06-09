import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceLoginDashboardService } from 'src/app/servicios/service-login-dashboard.service';
import { UsuarioInterface } from 'src/app/perfil/class/UsuarioInterface';
import { of, forkJoin, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MensajeschatService } from './servicios/mensajeschat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mensajeModel } from './modelos/mensajeModel';
import { ScrollToBottomDirective } from './directiva/scroll-to-bottom.directive';
import { AdminServiceService } from 'src/app/servicios/admin-service.service';

@Component({
  selector: 'app-detalle-conversacion',
  templateUrl: './detalle-conversacion.component.html',
  styleUrls: ['./detalle-conversacion.component.scss']
})
export class DetalleConversacionComponent implements OnInit {
  public usuarioDestinatario: UsuarioInterface;
  public usuarioActual: UsuarioInterface;

  public formGroup: FormGroup;
  public listadoMensajesOrdenados: Array<mensajeModel> = [];
  private idUsuarioDestinoRuta: number;
  private listaTodosLosUsuarios: Array<UsuarioInterface> = [];
  private observable: Subscription;
  @ViewChild(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective;


  constructor(private activaruta: ActivatedRoute,
    private route: Router,
    private loginService: ServiceLoginDashboardService,
    private mensajeService: MensajeschatService,
    private adminSErvice: AdminServiceService,
    private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      mensaje: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.idUsuarioDestinoRuta = Number.parseInt(this.activaruta.snapshot.paramMap.get('id'));
    this.usuarioActual = this.loginService.getDestn();




    this.listaTodosLosUsuarios = this.loginService.getTodosLosUsuariosExceptoActual();
    if (this.idUsuarioDestinoRuta != undefined) {
      of(this.listaTodosLosUsuarios).pipe(map(usuarios => usuarios.filter(usuario => usuario.idepsilon_usuarios == this.idUsuarioDestinoRuta))).subscribe((data: any) => {
        this.usuarioDestinatario = data[0];
      })
      this.cargarMensajes();
      this.activar5secsActualizacion();
    }

  }

  ionViewWillLeave() {
    this.observable.unsubscribe();
  }

  ngAfterViewInit() {

  }

  private activar5secsActualizacion() {
    this.observable = interval(5000).subscribe((data) => {
      this.cargarMensajes();
    })
  }

  public emitirMensaje(): void {
    if (this.formGroup.valid) {
      let mensaje: mensajeModel = {
        id_usuario_emisor: this.loginService.getDestn().idepsilon_usuarios,
        id_usuario_receptor: this.idUsuarioDestinoRuta,
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
        mensaje: this.formGroup.getRawValue().mensaje,
        visto: 0
      }

      this.mensajeService.enviarMensaje(mensaje).subscribe((data: any) => {
        this.cargarMensajes();
        this.formGroup.reset();
      })

    }
  }

  private cargarMensajes(): void {
    forkJoin(this.mensajeService.recibirMensajesComoEmisor(this.loginService.getDestn().idepsilon_usuarios, this.idUsuarioDestinoRuta), this.mensajeService.recibirMensajesComoReceptor(this.loginService.getDestn().idepsilon_usuarios, this.idUsuarioDestinoRuta)).subscribe((data: Array<Array<any>>) => {
      let res: Array<any> = data[0].concat(data[1]);
      this.listadoMensajesOrdenados = this.sortByDueDate(res);
      if (data[1].length > 0) {
        this.marcarComoLeidos(data[1]);
      }
    })
  }

  private marcarComoLeidos(array: Array<mensajeModel>): void {
    array.forEach(element => {
      if (element.visto == 0) {
        this.mensajeService.leerMensaje(element).subscribe((data) => {
          this.mensajeService.recuperarMensajesSinLeer(this.loginService.getDestn().idepsilon_usuarios).subscribe((data: Array<any>) => {
            this.loginService.setMensajesSinLeer(data);
            this.adminSErvice.getAppPages().forEach(appPage => {
              if (appPage.numMensajes != undefined) {
                appPage.numMensajes = data.length;
              }
            });
          })
        })
      }
    });
  }

  public sortByDueDate(arrayAOrdenarPorFecha: Array<mensajeModel>): Array<mensajeModel> {
    this.parseToDate(arrayAOrdenarPorFecha);
    arrayAOrdenarPorFecha.sort((a: mensajeModel, b: mensajeModel) => {
      return a.fecha.getTime() - b.fecha.getTime();
    });
    return arrayAOrdenarPorFecha;
  }

  public parseToDate(array: Array<mensajeModel>): void {
    array.forEach(elemento => {
      elemento.fecha = new Date(elemento.fecha);
    });
  }

  public volverAtras() {
    this.route.navigate(['mensajes'])
  }







}
