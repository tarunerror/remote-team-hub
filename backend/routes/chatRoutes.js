import express from 'express';
import { getMessages, sendMessage, deleteMessage } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/:channelId/messages', getMessages);
router.post('/messages', sendMessage);
router.delete('/messages/:id', deleteMessage);

export default router;