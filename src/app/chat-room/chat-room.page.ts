import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { NavController } from '@ionic/angular';
import { ChatService } from '../servicios/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

  nickname = '';
 
  constructor(public navCtrl: NavController,public router:Router, private socket: Socket,public chatservice:ChatService) { }
 
  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.chatservice.setNickname({ nickname: this.nickname })
    this.navCtrl.navigateForward('/chat-room-live')
   
  }

  ngOnInit() {
  }

}
