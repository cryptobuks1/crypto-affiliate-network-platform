import express from 'express';
const router = express.Router();

import isAdminController from '../controllers/admin/isAdminController';
import getRequestsController from '../controllers/admin/getRequestsController';
import approveController from '../controllers/admin/approveController';
import rejectController from '../controllers/admin/rejectController';
import getChatsController from '../controllers/admin/getChatsController';
import getKycsController from '../controllers/admin/getKycsController';
import approveKycController from '../controllers/admin/approveKycController';
import rejectKycController from '../controllers/admin/rejectKycController';

router.get('/', isAdminController);
router.get('/requests', getRequestsController);

router.put('/approve', approveController);
router.put('/reject', rejectController);

router.get('/get-chats', getChatsController);
router.get('/get-kycs', getKycsController);
router.put('/approve-kyc', approveKycController);
router.put('/reject-kyc', rejectKycController);

export default router;
