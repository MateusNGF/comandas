import { readdirSync } from 'fs';
import { join } from 'path';
import express, { Express, json, Router } from 'express';

class AppExpress {
  private app: Express = express();

  async init(): Promise<Express> {
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

  public async start(){
    this.app.listen(process.env.PORT, () => {
      console.log(`Server Running !! In ${process.env.PORT}`);
    })
  }

  public async close(){
    return;
  }
  
}

export default new AppExpress();
