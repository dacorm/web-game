import type { Request, Response } from 'express'
import { forumServise } from '../index'


interface IForumController {
  getAll(req:Request, res:Response):void
  create(req:Request, res:Response):void
}


export class ForumController implements IForumController{
  async getAll(_req:Request, _res:Response){
    console.log("Пришел запрпос")
   const data= await  forumServise.findAll()
    console.log(data)
    _res.send(data)
  }
  async create(req:Request, res:Response){
    console.log(req)
    console.log(res)
  }


}


export default new ForumController()

