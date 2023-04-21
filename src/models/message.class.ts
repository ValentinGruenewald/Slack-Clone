export class Message {
  name: string;
  time: string;
  message: string;

  constructor(obj?: any) {
    this.name = obj ? obj.name : '';
    this.time = obj ? obj.time : '';
    this.message = obj ? obj.message : '';
  }
}
