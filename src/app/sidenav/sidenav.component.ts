import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from 'src/models/chat.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { DialogConfirmDeleteChatComponent } from '../dialog-confirm-delete-chat/dialog-confirm-delete-chat.component';
import { DialogAddChatComponent } from '../dialog-add-chat/dialog-add-chat.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private usersService: UsersService,
    public authService: AuthService
  ) {}

  chat = new Chat();
  allChats: Chat[] = [];
  allUsers: any;
  currentUserId: string;
  openChat: any;
  docs: any[] = [];
  openChats: any[] = [];

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });

    this.firestore
      .collection('chats')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChats = changes;
      });
    setTimeout(() => {
      this.getCurrentUser();
    }, 1000);

    this.checkChatsForCurrentUser();
  }

  getCurrentUser() {
    this.usersService.currentUserProfile$.subscribe((userProfile) => {
      if (userProfile) {
        this.currentUserId = userProfile.uid;
      }
    });
  }

  showDirectChatUser([u1, u2]: [string, string]) {
    if (u1 == this.currentUserId) {
      return this.allUsers.filter((user) => user.customIdName === u2)[0];
    } else {
      return this.allUsers.filter((user) => user.customIdName === u1)[0];
    }
  }

  checkIfUserIsInChat(userIds: string[] | undefined) {
    return userIds?.some((id) => id === this.currentUserId);
  }

  openAddChannelDialog() {
    setTimeout(() => {
      this.dialog.open(DialogAddChannelComponent);
    }, 100);
  }

  openAddChatDialog() {
    this.dialog.open(DialogAddChatComponent, {
      data: this.openChats,
    });
  }

  openConformationDialog(chat) {
    this.dialog.open(DialogConfirmDeleteChatComponent, {
      data: chat,
    });
  }

  checkChatsForCurrentUser() {
    this.firestore
      .collection('chats')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((document) => document.payload.doc.data())
        )
      )
      .subscribe((docs) => {
        this.docs = docs;
      });
  }

  isChatUser() {
    for (let i = 0; i < this.docs.length; i++) {
      const element = this.docs[i];
      if (
        element['userIds'].includes(this.currentUserId) &&
        element['groupchat'] === false
      ) {
        const otherUserId = element['userIds'].find(
          (id) => id !== this.currentUserId
        );
        if (otherUserId && !this.openChats.includes(otherUserId)) {
          this.openChats.push(otherUserId);
        }
      }
    }
  }
}
