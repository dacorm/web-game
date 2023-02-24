import type { Forum } from '../index'


export class ForumServices{
  forum: typeof Forum
  constructor(model: typeof Forum) {
    console.log("model", model)
    this.forum=model
  }

  async findAll(){
    return this.forum.findAll();
  }

  async createForum( createdById:number, countMsg:number, themeName:string,) {
    await this.forum.create({ createdById, countMsg, themeName });
  }

}