import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { ChatService } from '../servicios/chat.service';

@Component({
  selector: 'app-chat-room-live',
  templateUrl: './chat-room-live.page.html',
  styleUrls: ['./chat-room-live.page.scss'],
})
export class ChatRoomLivePage implements OnInit {

  messages = [];
  nickname = '';
  message = '';



  ngOnInit() {

  }

  constructor(private socket: Socket, private toastCtrl: ToastController,public service:ChatService) {
    this.nickname = this.service.getNickname();

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    let toast =  await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
