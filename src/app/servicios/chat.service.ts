import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public nickname:any;

  constructor() { }

  public setNickname(param:any){
    this.nickname=param;
  }
  public getNickname(){
    return this.nickname;
  }
}
