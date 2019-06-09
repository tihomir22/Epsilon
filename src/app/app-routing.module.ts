import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleConversacionComponent } from './mensajes/detalle-conversacion/detalle-conversacion.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'agregar-activos', loadChildren: './agregar-activos/agregar-activos.module#AgregarActivosPageModule' },
  { path: 'detalles-activo', loadChildren: './detalles-activo/detalles-activo.module#DetallesActivoPageModule' },
  { path: 'modalpage', loadChildren: './modales/modalpage/modalpage.module#ModalpagePageModule' },
  { path: 'noticias', loadChildren: './noticias/noticias.module#NoticiasPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'plantilla-api', loadChildren: './plantilla-api/plantilla-api.module#PlantillaAPIPageModule' },
  { path: 'ajustes', loadChildren: './ajustes/ajustes.module#AjustesPageModule' },
  { path: 'alertas', loadChildren: './alertas/alertas.module#AlertasPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'mensajes', loadChildren: './mensajes/mensajes.module#MensajesPageModule' },
  { path: 'mensajes/:id', component: DetalleConversacionComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
