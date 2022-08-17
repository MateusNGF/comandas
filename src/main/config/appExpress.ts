import { join } from 'path';
import { Server } from 'http';
import { readdirSync } from 'fs';
import express, { Express, json, Router } from 'express';

import { Database } from '../../infra/database/contracts';
import { MongoDB } from '../../infra/database/mongodb';


class AppExpress {
  private app: Express = express();
  private server : Server | null = null;
  private database : Database | null = null;

  async init(): Promise<Express> {
    this.setupDatabase();
    this.setupMiddlewares();
    this.setupRoutes();
    return this.app;
  }

  private setupRoutes(router: Router = Router()): void {
    readdirSync(join(__dirname, '../routes'))
      .filter((file) => !file.endsWith('.map'))
      .map(async (file) => {
        const prefix_route = file.split('.')[0];
        (await import(`../routes/${file}`)).default(router);
        this.app.use(`/api/${prefix_route}`, router);
      });
  }

  private setupMiddlewares(): void {
    this.app.use(json());
  }

  private setupDatabase() {
    if (!this.database){
      this.database = MongoDB
    }
  } 

  public async start() : Promise<void> {
    if (this.database){
      return this.database.connect().then(() => {
        console.log(`Connection success at database !!`)
        this.server = this.app.listen(process.env.PORT, () => {
          console.log(`Server Running at ${process.env.PORT}`);
        });
      })
    }
      
    throw new Error("Database not has configurated.")
  }

  public async close() : Promise<void> {
    this.server && this.server.close()
    this.database && this.database.close()
  }
}

export default new AppExpress();
