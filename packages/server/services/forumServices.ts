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

  async createForum(title: string, user_id: number) {
    console.log(this.forum, title, user_id)
    this.forum.create({ title, user_id });
  }

}