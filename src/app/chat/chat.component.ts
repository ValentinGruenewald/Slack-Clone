import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/models/chat.class';
import { Observable } from 'rxjs';
import { Message } from 'src/models/message.class';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chatId: any = '';
  chat$: Observable<Chat>;
  allUsers;
  currentUserId: string = 'QM1Lb5uyABUDZrgz180W';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.chatId = paramMap.get('id');
      this.getChat();

      this.firestore
        .collection('users')
        .valueChanges({ idField: 'customIdName' })
        .subscribe((changes: any) => {
          this.allUsers = changes;
        });

      this.chat$ = this.getChat();
    });
  }

  getChat() {
    return this.firestore
      .collection('chats')
      .doc(this.chatId)
      .valueChanges() as Observable<Chat>;
  }

  sendMessage(message: string, chat: Chat) {
    let sentMessage = new Message({
      userId: this.currentUserId,
      message: message,
    });
    console.log(sentMessage);
    chat.messages.push(sentMessage.toJSON());
    this.firestore.collection('chats').doc(this.chatId).update(chat);
  }

  findUser(id: string) {
    return this.allUsers.filter((user) => user.customIdName === id)[0];
  }

  createGroupChat(name) {
    let chat = new Chat;
    chat.groupchat = true;
    chat.chatName = name;
    chat.userIds = [this.currentUserId];
    this.firestore
      .collection('chats')
      .add(chat.toJSON())
      .then((result: any) => {
        console.log('Adding chat finished' + result);
      });
  }
}
