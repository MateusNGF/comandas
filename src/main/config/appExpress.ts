import setRouters from './setRouters'
import express, { Express } from 'express'

class AppExpress {
  private app : Express = express()

  async init() : Promise<Express> {
    
    setRouters(this.app)

    return this.app
  }
}


export default new AppExpress() 