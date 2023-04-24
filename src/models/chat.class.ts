export class Chat {
  chatName: string;
  groupchat: boolean;
  userIds: [string, string];
  messages: [{ name: string; message; string; time: number }];

  constructor(obj?: any) {
    this.chatName = obj ? obj.chatName : '';
    this.groupchat = obj ? obj.groupchat : '';
    this.userIds = obj ? obj.userIds : '';
    this.messages = obj ? obj.allMessages : '';
  }

  public toJSON() {
    return {
      chatName: this.chatName,
      groupchat: this.groupchat,
      userIds: this.userIds,
      messages: this.messages,
    };
  }
}