import express from 'express';
const router = express.Router();

import signInController from '../controllers/index/signInController';
import signUpController from '../controllers/index/signUpController';
import requestTokenController from '../controllers/index/requestTokenController';
import updatePasswordController from '../controllers/index/updatePasswordController';
import startChatController from '../controllers/index/startChatController';
import findChatController from '../controllers/index/findChatController';

router.post('/sign-up', signUpController);
router.post('/sign-in', signInController);
router.put('/reset-password', requestTokenController);
router.put('/update-password', updatePasswordController);
router.post('/start-chat', startChatController);
router.get('/find-chat/:chatId', findChatController);

export default router;
