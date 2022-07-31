import { readdirSync } from "fs";
import { join } from "path";
import express, { Express, json, Router } from "express";

class AppExpress {
  private app: Express = express();

  async init(): Promise<Express> {

    this.setupMiddlewares();
    this.setupRoutes();

    return this.app;
  }

  private setupRoutes(router: Router = Router()): void {
    readdirSync(join(__dirname, "../routes"))
      .filter((file) => !file.endsWith(".map"))
      .map(async (file) => {
        (await import(`../routes/${file}`)).default(router);
      });

    this.app.use("/api", router);
  }

  private setupMiddlewares() : void{
    this.app.use(json())
  }
}

export default new AppExpress();
