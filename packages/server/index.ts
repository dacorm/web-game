import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
// @ts-ignore
import expressWs = require('express-ws');




const app = express()
// @ts-ignore
const WSserver = expressWs(app)
const aWss = WSserver.getWss()
// @ts-ignore
app.ws('/', (ws, req)=>{
  ws.send(JSON.stringify({
    method: 'connection',
    message: "success!!"
  }))
  ws.on('message', (msg:string)=>{
    const message = JSON.parse(msg)
    console.log("getted mes from client", msg)
    console.log("getted mes from client", message)
    switch (message.method) {
      case "connection":{
        connectionHandler(ws, msg)
        break;
      }
      case "addGame":{
        broadcastConnection(ws, msg)
        break;
      }

      default: break
    }
  })



})



//console.log(WSserver)

app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001



app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
// @ts-ignore
const connectionHandler = (ws, msg) => {
  broadcastConnection(ws, msg)
}
// @ts-ignore
const broadcastConnection = (ws, msg) => {
  let i=0;
  // @ts-ignore
  aWss.clients.forEach((client) => {

      console.log('Index', i)
    i++;
      client.send(msg)

  })
}