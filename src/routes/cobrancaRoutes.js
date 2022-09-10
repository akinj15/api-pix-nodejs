import { Router } from 'express';
import Cobranca from '../controllers/cobrancaController.js'
const routerCobranca = new Router();

routerCobranca.post('/', Cobranca.store);

export default routerCobranca
