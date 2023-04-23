import { Component } from '@angular/core';
import { Message } from 'src/models/message.class';
import { Chat } from 'src/models/user.class';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  chatId: any = '';
  chat = {
    chatId: 'testId1234',
    userIds: ['user1', 'user2'],
    allMessages: [
      {
        name: 'Name1',
        message: 'Message1',
        time: '17:59',
      },
      {
        name: 'Name1',
        message: 'Message2',
        time: '18:00',
      },
      {
        name: 'Name1',
        message: 'Message3',
        time: '18:05',
      },
    ],
  };

  sendMessage(message) {
    let sentMessage = new Message({
      name: 'name1',
      message: message,
      time: new Date(),
    });
    this.chat.allMessages.push(sentMessage);
  }
}
