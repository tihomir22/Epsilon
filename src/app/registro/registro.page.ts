import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import {FormBuilder,FormGroup,AbstractControl,Validators,FormControl} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  passwordType:string = 'password';
  passwordShown:boolean=false;
  colorOjo:string = 'medium';

  passwordType2:string = 'password';
  passwordShown2:boolean=false;
  colorOjo2:string = 'medium';
  
  formgroup:FormGroup;
  matching_passwords_group:FormGroup;
  name:AbstractControl;
  email:AbstractControl;
  pass:AbstractControl;
  pass2:AbstractControl;

  usuarioString:String;
  emailString:String;
  passString:String;
  passString2:String;
  sexoString:String;


  /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */
   private baseURI               : string  = "http://dembow.gearhostpreview.com/";


  constructor(public navCtrl:NavController,public formbuilder:FormBuilder,public http:HttpClient,public NP:NavParams,private toastCtrl:ToastController) {

    this.formgroup=formbuilder.group({
      name:['',Validators.compose([Validators.required,Validators.maxLength(25)])],
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


    this.name=this.formgroup.controls['name'];
    this.email=this.formgroup.controls['email'];

    this.pass=this.formgroup.controls['pass'];
    this.pass2=this.formgroup.controls['pass2'];

  }

   /**
    * Save a new record that has been added to the page's HTML form
    * Use angular's http post method to submit the record data
    *
    * @public
    * @method createEntry
    * @param this.usuarioString 			{String} 			Name value from form field
    * @param this.emailString 	{String} 			Description value from form field
    * @param this.passString 	{String} 			Pass value from form field
    * @param this.sexoString 	{String} 			Gender value from form field
    * @return {None}
    */
   createEntry(usuario : string, email : string,pass:string,sexo:string) : void
   {
    if(this.formgroup.status=="VALID"){
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "create", "usuario" : usuario, "email" : email,"pass":pass,"sexo":sexo},
          url       : any      	= this.baseURI + "manage-dataIONIC.php";

      this.http.post(url, JSON.stringify(options), headers)
      
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.sendNotification(`Felicidades el usuario: ${name} fue creado exitosamente`);
      },
      (error : any) =>
      {
         this.sendNotification('Algo fue mal!' + JSON.stringify(options));
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
   async sendNotification(message : string)
   {
      let toast = await this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      toast.present();
   }

  
 
  
  ngOnInit() {
  }

 
  cancelar(){
    this.navCtrl.goBack();
  }

  mostrarContrasenya(int:number){
    if(int == 1){
      if(this.passwordShown){
        this.passwordShown=false;
        this.passwordType='password';
        this.colorOjo='medium';
      }else{
        this.passwordShown=true;
        this.passwordType='text';
        this.colorOjo='primary';
      }
  }else{

    if(this.passwordShown2){
      this.passwordShown2=false;
      this.passwordType2='password';
      this.colorOjo2='medium';
    }else{
      this.passwordShown2=true;
      this.passwordType2='text';
      this.colorOjo2='primary';
    }
  }
}

}
