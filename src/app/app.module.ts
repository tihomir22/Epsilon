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
import { ExpandableComponent } from '../app/expandable/expandable.component';
import { ModalpagePage } from '../app/modalpage/modalpage.page';

import { Camera } from '@ionic-native/camera/ngx/';
import { Crop } from '@ionic-native/crop/ngx/';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonicStorageModule } from '@ionic/storage';




@NgModule({
  declarations: [AppComponent, ExpandableComponent, ModalpagePage,],
  entryComponents: [ModalpagePage],
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
    
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: AgregarActivosPage
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
