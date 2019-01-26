import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { NavParams, ModalController, Platform, ToastController, ActionSheetController, LoadingController } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';

import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { ServiceLoginDashboardService } from '../service-login-dashboard.service';
import { RegistroPage } from '../registro/registro.page';




const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
})
export class ModalpagePage implements OnInit {
  public url:any=undefined;
  images = [];
  public path: string;
  private baseURI: string = "http://dembow.gearhostpreview.com/";
  constructor(public modal: ModalController,private service:ServiceLoginDashboardService, private loadingController: LoadingController, private ref: ChangeDetectorRef, private actionsheet: ActionSheetController, public picker: ImagePicker, public file: File, public camera: Camera, public crop: Crop, private plt: Platform, private storage: Storage, private http: HttpClient, private webview: WebView, private toast: ToastController) {
    this.path = 'http://dembow.gearhostpreview.com/fotosusuarios/5dygkkwm33f01.jpg';
  }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadStoredImages();
    })
  }

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    });
  }
 

  async selectImage() {
    const actionSheet = await this.actionsheet.create({
      header: "Selecciona entrada de imagen",
      buttons: [{
        text: 'Cargar desde galeria',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Usar camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  redimensionar(pathImagen:any) {
    this.crop.crop(pathImagen.filePath, { quality: 75 })
      .then(respuesta=>{
       console.dir(respuesta)
       //consigo el nombre del fichero??
       var currentName = respuesta.substr(respuesta.lastIndexOf('/') + 1);
       var res = currentName.split("?")[0];
        currentName = res;
        console.dir(currentName)
        //vamos a por la ruta de este
        var correctPath = respuesta.substr(0, respuesta.lastIndexOf('/') + 1);
        console.dir(correctPath)

        this.copyFileToLocalDir(correctPath,currentName,this.createFileName());
        
      /*
        do {
          console.dir("valor url " + this.url)
            if(this.url!=undefined){
              this.startUploadV2(this.url);
              break;
            }
        }while(this.url==undefined);
       */

      },err=>console.dir(err));
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (options.sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var res = currentName.split("?")[0];
        currentName = res;
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      }
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    });
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
  /* console.dir("namePath parametro1")
    console.dir(namePath)
    console.dir("currentName parametro2")
    console.dir(currentName)
    console.dir("this.file.dataDiretory parametro de funcion")
    console.dir(this.file.dataDirectory)
    console.dir("newFileName parametro3")
    console.dir(newFileName)*/
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
     // this.presentToast('Dispongo a actualizar.');
     console.dir("Respuesta de la copiada")
     console.dir(success)
     this.url=success;
      this.updateStoredImages(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
      console.dir(error);
    });
  }
  updateStoredImages(name) {
    console.dir("Me ejcuto metodo updatestoredimages  y mi parametro es ")
    console.dir(name)
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
  cerrarModal(){
    this.modal.dismiss();
  }



  async presentToast(text) {
    const toast = await this.toast.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);

    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

      var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.presentToast('Archivo eliminado.');
      });
    });
  }

  startUpload(imgEntry) {
    console.dir("starteando upload!")
    console.dir(imgEntry.filePath)
    this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file))
      })
      .catch(err => {
        this.presentToast('Error mientras se leia el fichero.');
      });
  }

  startUploadV2(imgEntry) { 
    this.file.resolveLocalFilesystemUrl(imgEntry.nativeURL)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file))
      })
      .catch(err => {
        this.presentToast('Error mientras se leia el fichero V2.');
      });
  }
  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {

    const loading = await this.loadingController.create({
      message: 'Subiendo imagen...',
    });
    await loading.present();
    this.http.post("http://dembow.gearhostpreview.com/upload.php", formData)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(res => {
        if (res['success']) {
          this.service.setImagenUsuario(this.images[this.images.length -1].path);
          this.presentToast('Archivo subido con exito.')
          this.cerrarModal();
        } else {
          this.presentToast('Fallo al subir la imagen.')
        }
      });

  }







}
