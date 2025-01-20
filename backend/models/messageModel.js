export class Message {
  constructor(data) {
    this.id = data.id;
    this.content = data.content;
    this.senderId = data.senderId;
    this.channelId = data.channelId;
    this.type = data.type || 'text';
    this.parentId = data.parentId;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      content: this.content,
      senderId: this.senderId,
      channelId: this.channelId,
      type: this.type,
      parentId: this.parentId,
      createdAt: this.createdAt
    };
  }
}