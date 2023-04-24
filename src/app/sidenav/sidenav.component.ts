import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from 'src/models/Chat.class';

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

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
        console.log(this.allUsers);
      });

    this.firestore
      .collection('chats')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChats = changes;
        console.log(this.allChats);
      });
  }

  findUser(id: string): User {
    return this.allUsers.filter((user) => user.uid === id)[0];
  }
}
