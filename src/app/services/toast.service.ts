import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private message: MessageService) { }

  add(message: Message) {
    this.message.add({
      key: 'main',
      ...message
    });
  }
}
