import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { NoticiasSSService } from '../../servicios/noticias-ss.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Noticia } from '../../noticias/clases/noticiaClass';

@Component({
  selector: 'app-modal-noticias',
  templateUrl: './modal-noticias.component.html',
  styleUrls: ['./modal-noticias.component.scss']
})
export class ModalNoticiasComponent implements OnInit {

  // "value" passed in componentProps
  @Input() value: number;
  public array: any;

  constructor(navParams: NavParams, public modal: ModalController, public service: NoticiasSSService, private iab: InAppBrowser, private social: SocialSharing) {
    // componentProps can also be accessed at construction time using NavParams
  }
  ngOnInit() {
    this.service.recuperarNoticiaFavoritaServidor().subscribe((data) => { this.array = data; }, (error) => { }, () => { console.log("hemos terminado", this.array) });
  }
  cerrarModal() {
    this.modal.dismiss();
  }
  public abrirArticulo(url: string) {
    this.iab.create(url);
  }
  public compartirArticulo(noticia: Noticia) {
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: noticia.title, // not supported on some apps (Facebook, Instagram)
      subject: "[EPSILON]" + noticia.body, // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: noticia.url,
      chooserTitle: 'Elige una app' // Android only, you can override the default share sheet title,
    };
    this.social.shareWithOptions(options);


  }

}
