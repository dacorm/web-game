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

  async findThemesForOnePage (offset: number, limit:number){
   return this.forum.findAll({ offset: offset, limit: limit, order: [
       ['themeId', 'DESC']] })
  }

  async createForum( createdById:number, countMsg:number, themeName:string,) {
    await this.forum.create({ createdById, countMsg, themeName });
  }

  async getCountThemes(){
    return this.forum.count()
  }

}