import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, MenuController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceLoginDashboardService } from '../servicios/service-login-dashboard.service';
import { ApisService } from '../servicios/apis.service';
import { apiInterfaz } from '../modales/vista-rapida-api/models/apiInterfaz';
import { MailingService } from '../servicios/mailing.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formgroup: FormGroup;
  usuario: AbstractControl;
  pass: AbstractControl;

  userString: String;
  passString: String;

  /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */
  private baseURI: string = "http://dembow.gearhostpreview.com/";



  constructor(public menuCtrl: MenuController,
    private platform: Platform,
    public navCtrl: NavController,
    public http: HttpClient,
    public formbuilder: FormBuilder,
    public toastCtrl: ToastController,
    public service: ServiceLoginDashboardService,
    private apiservice: ApisService,
    private mailingservice: MailingService) {
    this.formgroup = formbuilder.group({
      usuario: ['', Validators.required],
      pass: ['', Validators.required]
    });

    this.usuario = this.formgroup.controls['usuario'];
    this.pass = this.formgroup.controls['pass'];
    this.menuCtrl.enable(false);
  }

  login() {
    if (this.formgroup.status == "VALID") {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any = { "key": "login", "usuario": this.userString, "pass": this.passString },
        url: any = this.baseURI + "retrieve-data.php";

      this.http
        .post(url, JSON.stringify(options), headers)
        .subscribe((data: any) => {
          console.dir(data);
          this.service.setDestn(data);
          this.apiservice.recuperarClavesAPIbyIDUSER(data.idepsilon_usuarios).subscribe((data: Array<apiInterfaz>) => {
            this.apiservice.listaApisIniciales = data;
            console.log(data)
          }, (error) => {
            console.log(error)
          }, () => { })
          this.navCtrl.navigateForward("/dashboard");
        },
          (error: any) => {
            this.sendNotification('Los datos son incorrectos');
          });

    } else {
      console.log("error de aceso??")
    }

  }
  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  abrirRegistro() {
    this.navCtrl.navigateForward("/registro");
  }

}
