import type { Message } from '../index'

export class MessageService{
  message: typeof Message
  constructor(model: typeof Message) {
    console.log("model", model)
    this.message=model
  }

  async findAll(){
    return this.message.findAll();
  }

  async createMessage(  themeId: number, text: string, authorId: number) {
    await this.message.create({ themeId, text, authorId });
  }

}