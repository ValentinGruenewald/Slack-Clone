import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/models/message.class';
import { Chat } from 'src/models/Chat.class';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chatId: any = '';
  chat: Chat = new Chat();

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.chatId = paramMap.get('id');
      this.getChat();
    });
  }

  getChat() {
    this.firestore
      .collection('chats')
      .doc(this.chatId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.chat = changes;
      });
  }

  sendMessage(message) {
    let sentMessage = new Message({
      userId: 'QM1Lb5uyABUDZrgz180W',
      message: message,
      time: new Date().getHours() + ':' + new Date().getUTCMinutes(),
    });
    //this.firestore.collection('chats').doc(this.chatId).update();
  }
}
