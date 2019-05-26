import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalpagePage } from '../modales/modalpage/modalpage.page';
import { ServiceLoginDashboardService } from '../servicios/service-login-dashboard.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  codigoPais: string = "+34";


  passwordType: string = 'password';
  passwordShown: boolean = false;
  colorOjo: string = 'medium';

  passwordType2: string = 'password';
  passwordShown2: boolean = false;
  colorOjo2: string = 'medium';

  formgroup: FormGroup;

  generarImagen: any = 'http://dembow.gearhostpreview.com/fotosusuarios/5dygkkwm33f01.jpg';

  name: AbstractControl;
  email: AbstractControl;
  pass: AbstractControl;
  pass2: AbstractControl;
  tel: AbstractControl;
  codigo: AbstractControl;

  /**
   * @name usuarioString
   * @type {Any}
   * @public
   * @description     string de usuario en el form
   */
  public usuarioString: any;

  /**
   * @name emailString
   * @type {Any}
   * @public
   * @description     string de email en el form
   */
  public emailString: any;

  /**
   * @name telString
   * @type {Any}
   * @public
   * @description     string de telString en el form
   */
  public telString: any = "";

  /**
    * @name passString
    * @type {Any}
    * @public
    * @description     string de pass1 en el form
    */
  public passString: any;

  /**
    * @name passString2
    * @type {Any}
    * @public
    * @description     string de pass2 en el form
    */
  public passString2: any;

  /**
   * @name sexoString
   * @type {Any}
   * @public
   * @description     string de sexo en el form
   */
  public sexoString: any;

  /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */
  private baseURI: string = "http://dembow.gearhostpreview.com/";


  constructor(public navCtrl: NavController, public service: ServiceLoginDashboardService, public http: HttpClient, public formbuilder: FormBuilder, public toastCtrl: ToastController, public modalController: ModalController) {


    this.formgroup = formbuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
      tel: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])],
      codigo: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([
        Validators.maxLength(100),
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      //pass:['',Validators.required],

      pass: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(40),
        Validators.required,
        Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])],


      pass2: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(40),
        Validators.required,
        Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])]

    })


    this.name = this.formgroup.controls['name'];
    this.email = this.formgroup.controls['email'];
    this.tel = this.formgroup.controls['tel'];
    this.codigo = this.formgroup.controls['codigo'];

    this.pass = this.formgroup.controls['pass'];
    this.pass2 = this.formgroup.controls['pass2'];



  }

  ngOnInit() {
    this.generarImagen = this.service.getImagenUsuario();
    this.generarImg();
  }
  ionViewWillEnter() {
    this.generarImagen = this.service.getImagenUsuario();
    this.generarImg();
  }


  checkValue(value: any) {
    if (value.target.value == "masculino") {
      this.sexoString = "masculino";
    } else {
      this.sexoString = "femenino";
    }
  }

  generarImg() {
    if (this.generarImagen == '' || this.generarImagen == null || this.generarImagen == undefined) {
      //this.service.recuperarRutaImgUsuario(this.service.getDestn)
      // console.dir(this.service.getDestn())
      return 'http://dembow.gearhostpreview.com/fotosusuarios/5dygkkwm33f01.jpg';
    } else {
      return this.generarImagen;
    }
  }

  async mostrarImagen() {
    // Create a modal using MyModalComponent with some initial data
    const modal = await this.modalController.create({
      component: ModalpagePage,

    });
    modal.onDidDismiss().then((result => {

      this.generarImagen = this.service.getImagenUsuario()
      this.generarImg()
      console.dir(this.generarImagen)
    }));
    modal.present();
  }


  createEntry(): void {
    if (this.formgroup.status == "VALID") {

      console.dir(this.codigoPais + "|" + this.telString)

      if (this.generarImagen == undefined) {
        this.generarImagen = "http://dembow.gearhostpreview.com/fotosusuarios/5dygkkwm33f01.jpg";
      }
      var rutaReal = this.generarImagen.substr(this.generarImagen.lastIndexOf('/') + 1)
      rutaReal = this.baseURI + "fotosusuarios/" + rutaReal;
      
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any = { "key": "create", "usuario": this.usuarioString, "email": this.emailString, "pass": this.passString, "sexo": this.sexoString, "rutaImagen": rutaReal, "telefono": this.codigoPais + "" + this.telString },
        url: any = this.baseURI + "manage-dataIONIC.php";

      this.http.post(url, JSON.stringify(options), headers)

        .subscribe((data: any) => {
          // If the request was successful notify the user
          this.sendNotification(`Felicidades el usuario: ${this.usuarioString} fue creado exitosamente`);
          this.navCtrl.goBack();
        },
          (error: any) => {
            if (error.status == 200) {
              this.sendNotification('El usuario: ' + this.usuarioString + ' ya existe! ');
            } else {
              this.sendNotification('Algo fue mal!' + JSON.stringify(options));
            }
          });
    }
  }

  /**
  * Manage notifying the user of the outcome of remote operations
  *
  * @public
  * @method sendNotification
  * @param message 	{String} 			Message to be displayed in the notification
  * @return {None}
  */
  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }







  cancelar() {
    this.navCtrl.goBack();
  }

  mostrarContrasenya(int: number) {
    if (int == 1) {
      if (this.passwordShown) {
        this.passwordShown = false;
        this.passwordType = 'password';
        this.colorOjo = 'medium';
      } else {
        this.passwordShown = true;
        this.passwordType = 'text';
        this.colorOjo = 'primary';
      }
    } else {

      if (this.passwordShown2) {
        this.passwordShown2 = false;
        this.passwordType2 = 'password';
        this.colorOjo2 = 'medium';
      } else {
        this.passwordShown2 = true;
        this.passwordType2 = 'text';
        this.colorOjo2 = 'primary';
      }
    }
  }

}
