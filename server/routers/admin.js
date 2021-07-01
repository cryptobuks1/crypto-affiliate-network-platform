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
import getRequestsSliceController from '../controllers/admin/getRequestsSliceController';
import setVideosController from '../controllers/admin/setVideosController';
import setAnnoucementController from '../controllers/admin/setAnnouncementController';
import findUsersController from '../controllers/admin/findUsersController';
import streamStateController from '../controllers/admin/streamStateController';
import bulkUpdateController from '../controllers/admin/bulkUpdateController';

router.get('/', isAdminController); // check if a user is admin
router.get('/requests', getRequestsController); // all the requests sent by users to receieve money
router.get('/requests/:slice/:status', getRequestsSliceController);
router.put('/approve', approveController); // money request
router.put('/reject', rejectController); // money request
router.get('/get-chats', getChatsController); // all chats that are currently active
router.get('/get-kycs', getKycsController); // all known your customer requests ( identity verification )
router.put('/approve-kyc', approveKycController);
router.put('/reject-kyc', rejectKycController);
router.get('/messages', getMessagesController);
router.put('/update-message', updateMessageController);
router.get('/get-withdrawals', getWithdrawalsController);
router.put('/approve-withdrawal', approveWithdrawalController);
router.put('/reject-withdrawal', rejectWithdrawalController);
router.put('/set-videos', setVideosController);
router.put('/set-announcement', setAnnoucementController);
router.get('/find-users', findUsersController);
router.get('/stream-state', streamStateController);
router.put('/bulk-update', bulkUpdateController);

export default router;
