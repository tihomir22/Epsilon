import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }

  saveEntry(){
    alert("Suelta el torpedo loco");
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
