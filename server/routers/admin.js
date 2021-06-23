import express from 'express';
const router = express.Router();

import isAdminController from '../controllers/admin/isAdminController';
import getRequestsController from '../controllers/admin/getRequestsController';
import approveController from '../controllers/admin/approveController';
import rejectController from '../controllers/admin/rejectController';
import getChatsController from '../controllers/admin/getChatsController';

router.get('/', isAdminController);
router.get('/requests', getRequestsController);
router.put('/approve', approveController);
router.put('/reject', rejectController);
router.get('/get-chats', getChatsController);

export default router;
