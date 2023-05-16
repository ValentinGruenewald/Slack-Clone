import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from 'src/models/chat.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';

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
  allUsers;
  currentUserId: string;

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
      this.getChurrentUser();
    }, 1000);
  }

  getChurrentUser() {
    this.usersService.currentUserProfile$.subscribe((userProfile) => {
      this.currentUserId = userProfile.uid;
    });
  }

  showDirectChatUser(userIds: string[]) {
    if (userIds[0] == this.currentUserId) {
      return this.allUsers.filter(
        (user) => user.customIdName === userIds[1]
      )[0];
    } else {
      return this.allUsers.filter(
        (user) => user.customIdName === userIds[0]
      )[0];
    }
  }

  checkIfUserIsInChat(userIds: string[] | undefined) {
    return userIds?.some((id) => id === this.currentUserId);
  }

  openDialog() {
    setTimeout(() => {
      this.dialog.open(DialogAddChannelComponent);
    }, 100);
  }
}
