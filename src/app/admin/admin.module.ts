import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';
import { MatListModule, MatIconModule, MatDialog, MatDialogModule } from '@angular/material';
import { DialogoAdminComponent } from './dialogo-admin/dialogo-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminPage, DialogoAdminComponent],
  entryComponents: [DialogoAdminComponent]
})
export class AdminPageModule { }
