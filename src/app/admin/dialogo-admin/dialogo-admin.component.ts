import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuarioInterface } from 'src/app/perfil/class/UsuarioInterface';
import { AdminServiceService } from 'src/app/servicios/admin-service.service';

@Component({
  selector: 'app-dialogo-admin',
  templateUrl: './dialogo-admin.component.html',
  styleUrls: ['./dialogo-admin.component.scss']
})
export class DialogoAdminComponent implements OnInit {

  public datos: Array<any>;
  public tipo: string;
  public arrayParaGuardar: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<DialogoAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>, private admin: AdminServiceService) {
    this.datos = data[0];
    this.tipo = data[1];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public checkear(item: UsuarioInterface) {
    let index = this.arrayParaGuardar.indexOf(item);
    if (index != -1) {
      this.arrayParaGuardar[index] = item;
    } else {
      this.arrayParaGuardar.push(item);
    }
  }

  public guardarUsuarios(): void {
    this.arrayParaGuardar.forEach(element => {
      this.admin.actualizarUsuario(element).subscribe((data) => {
        console.log(data)
      });
    });
    this.dialogRef.close();
  }

}
