import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, MenuController } from '@ionic/angular';
import {FormBuilder,FormGroup,AbstractControl,Validators,FormControl} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ServiceLoginDashboardService} from '../service-login-dashboard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formgroup:FormGroup;
  usuario:AbstractControl;
  pass:AbstractControl;

  userString:String;
  passString:String;

  /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */
   private baseURI               : string  = "http://dembow.gearhostpreview.com/";



  constructor(public menuCtrl:MenuController,public navCtrl:NavController,public http:HttpClient,public formbuilder:FormBuilder,public toastCtrl:ToastController,public service:ServiceLoginDashboardService) { 
    this.formgroup=formbuilder.group({
      usuario:['',Validators.required],
      pass:['',Validators.required]
    });

    this.usuario=this.formgroup.controls['usuario'];
    this.pass=this.formgroup.controls['pass'];
    this.menuCtrl.enable(false);
  }

  login(){
    if(this.formgroup.status=="VALID"){
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "login","usuario" : this.userString,"pass":this.passString},
      url       : any      	= this.baseURI + "retrieve-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         console.dir(data);
        this.service.setDestn(data);
        this.navCtrl.navigateForward("/dashboard");
      },
      (error : any) =>
      {
        this.sendNotification('Los datos son incorrectos');
      });

    }

  }
  async sendNotification(message : string)
   {
      let toast = await this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      toast.present();
   }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  abrirRegistro(){
    this.navCtrl.navigateForward("/registro");
  }

}
