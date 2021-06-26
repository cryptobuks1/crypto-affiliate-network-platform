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
import getMessagesController from '../controllers/admin/getMessagesController';
import updateMessageController from '../controllers/admin/updateMessageController';
import approveWithdrawalController from '../controllers/admin/approveWithdrawalController';
import rejectWithdrawalController from '../controllers/admin/rejectWithdrawalController';
import getWithdrawalsController from '../controllers/admin/getWithdrawalsController';

router.get('/', isAdminController);
router.get('/requests', getRequestsController);


router.put('/approve', approveController); // money request
router.put('/reject', rejectController); // money request


router.get('/get-chats', getChatsController);
router.get('/get-kycs', getKycsController);
router.put('/approve-kyc', approveKycController);
router.put('/reject-kyc', rejectKycController);


router.get('/messages', getMessagesController);
router.put('/update-message', updateMessageController);


router.get('/get-withdrawals', getWithdrawalsController);
router.put('/approve-withdrawal', approveWithdrawalController);
router.put('/reject-withdrawal', rejectWithdrawalController);


export default router;
