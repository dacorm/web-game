import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

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
