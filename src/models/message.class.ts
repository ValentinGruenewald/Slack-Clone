export class Message {
  userId: string;
  time: string;
  message: string;

  constructor(obj?: any) {
    this.userId = obj ? obj.userId : '';
    this.message = obj ? obj.message : '';
    this.time = Intl.DateTimeFormat('de-DE', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date());
  }

  public toJSON() {
    return {
      userId: this.userId,
      time: this.time,
      message: this.message,
    };
  }
}
