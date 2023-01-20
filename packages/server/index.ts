import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import * as path from 'path'

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, '../client/dist')));

const port = Number(process.env.SERVER_PORT) || 3001

//createClientAndConnect()

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
