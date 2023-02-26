import type { Request, Response } from 'express'
import { forumServise } from '../index'


interface IForumController {
  getAll(req:Request, res:Response):void
  create(req:Request, res:Response):void
}


export class ForumController implements IForumController{
  async getAll(_req:Request, _res:Response){
    console.log("Пришел запрос")
   const data= await  forumServise.findAll()
    _res.send(data)
  }
  async getOne(_req:Request, _res:Response){
    console.log("Пришел запрос")
    const {themeId}=_req.query
    const data= await  forumServise.findOne(Number(themeId))
    _res.send(data)
  }

  async getCountThemes(_req:Request, _res:Response){
    const data= await  forumServise.getCountThemes()
    console.log("data", data)
    _res.json({ count: data })
  }

  async findThemesForOnePage(_req:Request, _res:Response){
    console.log("Пришел запрос!!!!", _req.query)
    const {page, count}=_req.query
    if(count && page){
      const offset = Number(count)*(Number(page)-1)
      const data= await forumServise.findThemesForOnePage(offset, Number(count))
      //const data= await  forumServise.findAll()

      _res.send(data)
    }
  }



  async create(req:Request, res:Response){
    try {
      const {createdById, countMsg, themeName}=req.body
      await forumServise.createForum(createdById, countMsg, themeName)
      res.status(200).json({message: 'OK'})
    } catch (e) {
      res.status(500).json({message: "Ошибка сервера"})
    }

  }


}


export default new ForumController()

