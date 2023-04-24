import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from 'src/models/chat.class';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(private firestore: AngularFirestore) {}

  chat = new Chat();
  allChats: Chat[] = [];
  allUsers: User[] = [];
  currentUserId: string = 'QM1Lb5uyABUDZrgz180W';

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
  }

  findUser(id: string): User {
    return this.allUsers.filter((user) => user.uid === id)[0];
  }

  checkIfUserIsInChat(userIds: string[] | undefined) {
    return userIds?.some((id) => id === this.currentUserId);
  }
}
