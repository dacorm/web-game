import type { Request, Response } from 'express'
import { forumServise } from '../index'


interface IForumController {
  getAll(req:Request, res:Response):void
  create(req:Request, res:Response):void
}


export class ForumController implements IForumController{
  async getAll(_req:Request, res:Response){
    try{
      console.log("Пришел запрос")
      const data= await  forumServise.findAll()
      res.send(data)
    }catch (e){
      res.status(500).json({message: "Ошибка сервера"})
    }


  }
  async getOne(req:Request, res:Response){
    try{
      console.log("Пришел запрос")
      const {themeId}=req.query
      const data= await  forumServise.findOne(Number(themeId))
      res.send(data)
    }catch (e) {
      res.status(500).json({message: "Ошибка сервера"})
    }



  }

  async getCountThemes(_req:Request, res:Response){
    try{
      const data= await  forumServise.getCountThemes()
      res.json({ count: data })
    }catch (e) {
      res.status(500).json({message: "Ошибка сервера"})
    }


  }

  async findThemesForOnePage(req:Request, res:Response){
    try{
      console.log("Пришел запрос!!!!", req.query)
      const {page, count}=req.query
      if(count && page) {
        const offset = Number(count) * (Number(page) - 1)
        const data = await forumServise.findThemesForOnePage(offset, Number(count))
        //const data= await  forumServise.findAll()
        res.send(data)
      }
    } catch (e) {res.status(500).json({message: "Ошибка сервера"})}
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

