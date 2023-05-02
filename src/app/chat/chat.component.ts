import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/models/chat.class';
import { Observable, tap } from 'rxjs';
import { Message } from 'src/models/message.class';
import { AuthService } from '../services/auth.service';

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
  @ViewChild('chat') chatRef: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public authService: AuthService
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
      .valueChanges()
      .pipe(
        tap(() =>
          setTimeout(
            () =>
              Array.from(document.querySelectorAll('.chat-message'))
                .slice(-1)[0]
                ?.scrollIntoView(),
            0
          )
        )
      ) as Observable<Chat>;
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
    let chat = new Chat();
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

  showChatName(chatName: string, groupchat: boolean, userIds: string[]) {
    if (groupchat == true) {
      return chatName;
    } else {
      if (userIds[0] == this.currentUserId) {
        return this.allUsers.filter(
          (user) => user.customIdName === userIds[1]
        )[0].name;
      } else {
        return this.allUsers.filter(
          (user) => user.customIdName === userIds[0]
        )[0].name;
      }
    }
  }

  showCurrentUserName(currentUserId) {
    return this.allUsers.filter(
      (user) => user.customIdName === currentUserId)[0].name;
  }
}
