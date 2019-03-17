import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AgregarActivosPage } from './agregar-activos/agregar-activos.page';
import { ModalpagePage } from '../app/modalpage/modalpage.page';

import { Camera } from '@ionic-native/camera/ngx/';
import { Crop } from '@ionic-native/crop/ngx/';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { ModalNoticiasComponent } from './modal-noticias/modal-noticias.component';
import { fromEventPattern } from 'rxjs';






@NgModule({
  declarations: [AppComponent, ModalpagePage, ModalNoticiasComponent],
  entryComponents: [ModalpagePage, ModalNoticiasComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,

    FormsModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),





  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    Camera,
    Crop,
    WebView,
    SocialSharing,

    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: AgregarActivosPage
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
