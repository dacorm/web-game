import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
// @ts-ignore
import expressWs = require('express-ws');
import * as path from 'path'


// @ts-ignore
let games:any[] = []
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
    //console.log("getted mes from client", msg)
    console.log("getted mes from client", message)
    switch (message.method) {
      case MethodsMessages.connection:{
        connectionHandler(ws, msg)
        break;
      }
      case MethodsMessages.addGame:{
        broadcastConnection(ws, msg)
        // @ts-ignore
        games=[...games, ...message.games]
        console.log("games on the server", games)
        break;
      }
      case MethodsMessages.addAllGames:{
        // @ts-ignore
        if(games.length>0){
          ws.send(JSON.stringify({
            method: 'addAllGames',
            games: games
          }))
        }

        break;
      }
      case MethodsMessages.addUser:{
         let idsGames: number[]|[]=[]
        idsGames=getIdsofGamesfromState(games)
         if(idsGames.includes(Number(message.gameId))){
           games.forEach((game)=> {
             if (game.id === Number(message.gameId)) {
               game.players.push(message.user);
             }
           })
         }

        // @ts-ignore

        broadcastConnection(ws, msg)

        break;
      }


      default: break
    }
  })



})



//console.log(WSserver)

app.use(cors())
app.use(express.static(path.join(__dirname, '../client/dist')));

const port = Number(process.env.SERVER_PORT) || 3001


// app.get('/', (_, res) => {
//   res.json('👋 Howdy from the server :)')
// })
app.get("/ServiceWorkers.js", (req, res) => {
  console.log(req)
  res.sendFile(path.resolve(__dirname,  "../client/dist/ServiceWorkers.js"));
});
app.get('*', (req, res) => {
  console.log(req)
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
// @ts-ignore
const connectionHandler = (ws, msg) => {
  broadcastConnection(ws, msg)
}



// @ts-ignore
const broadcastConnection = (ws, msg) => {
  console.log("broadcAST!!!!!!!!!!::::::::", msg)
  let i=0;
  // @ts-ignore
  aWss.clients.forEach((client) => {

      console.log('Index', i)
    i++;
      client.send(msg)

  })
}

function getIdsofGamesfromState(games:any[]) {
  const idsGames: any[] = [];
  games.forEach((game) => {
    if (game?.id) {
      idsGames.push(game.id);
    }
  });
  return idsGames;
}

export enum MethodsMessages  {
  addGame='addGame',
  addAllGames= "addAllGames",
  connection = 'connection',
  addUser = 'addUser',
}

export type MethodsMessagesType = MethodsMessages.addGame | MethodsMessages.addAllGames | MethodsMessages.connection