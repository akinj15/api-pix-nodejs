import { Router } from 'express';
import Webhook from '../controllers/webhookController.js'
const router = new Router();
router.post('/', Webhook.store);

export default router
