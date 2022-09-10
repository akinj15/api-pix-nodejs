import dotenv from 'dotenv'
dotenv.config()

import routerCobranca from './src/routes/cobrancaRoutes.js'
import routerWebhook from './src/routes/webhookRoutes.js'
import express from 'express'
import bodyParser from 'body-parser'

class App {
    constructor() {
      this.app = express();
      this.middlewares();
      this.routes();
    }
  
    middlewares() {
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(express.json());
      this.app.use(bodyParser.json());
    }
  
    routes() {
      this.app.use('/cobranca/', routerCobranca, () => console.log(1));
      this.app.use('/webhook(/pix)', routerWebhook);
    }
}
export default new App().app;

