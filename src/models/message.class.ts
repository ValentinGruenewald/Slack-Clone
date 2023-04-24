export type JsonMessage = {
  userId: string;
  message: string;
  createdAt: string;
};
export class Message {
  userId: string;
  message: string;
  createdAt: string;

  constructor(obj?: any) {
    this.userId = obj ? obj.userId : '';
    this.message = obj ? obj.message : '';
    this.createdAt = Intl.DateTimeFormat('de-DE', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date());
  }

  public toJSON(): JsonMessage {
    return {
      userId: this.userId,
      message: this.message,
      createdAt: this.createdAt,
    };
  }
}


