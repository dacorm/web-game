import type { Request, Response } from 'express'
import { messageServise } from '../index'


class MessageController{
  async getAll(_req:Request, _res:Response){
    console.log("Пришел запрос")
    const {themeId}=_req.query
    console.log("themId", themeId)
    const data= await  messageServise.findAll(Number(themeId))
    _res.send(data)
  }

  async create(req:Request, res:Response){
    console.log(req.body)
    try{
      const { themeId, text, authorId }=req.body
      await messageServise.create(themeId, text, authorId)
      res.status(200).json({message: 'OK'})
    }catch (e) {
      res.status(500).json({message: "Ошибка сервера"})
    }
  }

}


export const messageController = new MessageController()