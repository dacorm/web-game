import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
// @ts-ignore
import expressWs = require('express-ws');
import * as path from 'path'
import * as fs from 'fs'
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';


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

// -------------SSR------------------

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
 

  let vite: ViteDevServer;
 
  //чтобы это работало нужно создать ссылку на папку client с помощью yarn link
  // и потом server в node_modules добавить ссылку на эту папку
  // но чтобы проблем не было возни в разработке пока закоменчу

  // const distPath = path.resolve(__dirname, 'node_modules/client/dist/index.html')
  // const srcPath = path.resolve(__dirname, 'node_modules/client')
  // const ssrClientPath = path.resolve(__dirname, 'node_modules/client/ssr-dist/client.cjs') 

  const distPath = path.resolve(__dirname, '..//client/dist/index.html')
   
  const srcPath = path.resolve(__dirname, '../client')
 
  const ssrClientPath = path.resolve(__dirname, '../client/ssr-dist/client.cjs') 


  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }

  app.use(express.json());


  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  console.log("process.env.NODE_ENV", process.env.NODE_ENV)


  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;
      let configureStore: (
        preloadedState: Record<string, unknown> | undefined
    ) => any;

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8',
        )
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8',
        )
       
        template = await vite.transformIndexHtml(url, template)
      }

      let render: (req: string) => Promise<string>;

      if (!isDev()) {
        render = (await import(ssrClientPath)).render;
        configureStore = (await import(ssrClientPath)).configureStore
      } else {
        render = (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render;
        configureStore = (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).configureStore
      }

      const store = configureStore(undefined)
      const state = store.getState()

      const appHtml = await render(req.originalUrl)

      const stateHtml = `<script>window.__PRELOADED_STATE__=${JSON.stringify(
        state
    ).replace(/</g, "\\u003c")}</script>`;
      
      
      const html = template.replace(`<!--ssr-outlet-->`, appHtml + stateHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()


// -------------END SSR------------------


export enum MethodsMessages  {
  addGame='addGame',
  addAllGames= "addAllGames",
  connection = 'connection',
  addUser = 'addUser',
}

export type MethodsMessagesType = MethodsMessages.addGame | MethodsMessages.addAllGames | MethodsMessages.connection
