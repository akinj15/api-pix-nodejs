import { Router } from 'express';
import Cobranca from '../controllers/cobrancaController.js'
const router = new Router();
router.post('/', Cobranca.store);

export default router
