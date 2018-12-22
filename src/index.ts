import * as Koa from 'koa'
import { createConnection } from 'typeorm'
import "reflect-metadata"

import pupp from "./pupp";

const app = new Koa()

createConnection().then(() => {
  pupp()
}).catch(error => {
  console.log(error)
})

app.listen(3000, () => {
  console.log('[demo] start-quick is starting at port 3000')
})
