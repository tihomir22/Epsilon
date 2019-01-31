import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
 
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'agregar-activos', loadChildren: './agregar-activos/agregar-activos.module#AgregarActivosPageModule' },
  { path: 'detalles-activo', loadChildren: './detalles-activo/detalles-activo.module#DetallesActivoPageModule' },
  { path: 'modalpage', loadChildren: './modalpage/modalpage.module#ModalpagePageModule' },
  { path: 'modalpage', loadChildren: './modalpage/modalpage.module#ModalpagePageModule' },  { path: 'chat-room', loadChildren: './chat-room/chat-room.module#ChatRoomPageModule' },
  { path: 'chat-room-live', loadChildren: './chat-room-live/chat-room-live.module#ChatRoomLivePageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
