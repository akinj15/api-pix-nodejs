import { Router } from 'express';
import Webhook from '../controllers/webhookController.js'
const router = new Router();

router.get('/', Webhook.index);

export default router
