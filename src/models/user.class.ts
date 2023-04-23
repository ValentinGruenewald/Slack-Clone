export class Chat {
  chatId: string;
  userIds: [string, string];
  allMessages: [{ name: string; message; string; time: number }];

  constructor(obj?: any) {
    this.chatId = obj ? obj.chatId : '';
    this.userIds = obj ? obj.userIds : '';
    this.allMessages = obj ? obj.allMessages : '';
  }
}
