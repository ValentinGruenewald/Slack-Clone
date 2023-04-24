export class Message {
  userId: string;
  time: string;
  message: string;

  constructor(obj?: any) {
    this.userId = obj ? obj.userId : '';
    this.time = obj ? obj.time : '';
    this.message = obj ? obj.message : '';
  }

  public toJSON() {
    return {
      userId: this.userId,
      time: this.time,
      message: this.message,
    };
  }
}
