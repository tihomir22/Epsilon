import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { ChatRoomLivePage } from '../chat-room-live/chat-room-live.page';

const routes: Routes = [
  {
    path: '',
    component: ChatRoomLivePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatRoomLivePage]
})
export class ChatRoomLivePageModule {}