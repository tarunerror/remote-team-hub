import express from 'express';
import { getProfile, updateProfile, getUsers, updateUserStatus } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/', getUsers);
router.put('/status', updateUserStatus);

export default router;