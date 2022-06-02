import express from 'express';
const router = express.Router();
import {
  authAdmin,
  registerAdmin,
  getAdminProfile,
  changePassword,
  resetPassword,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/login', authAdmin);
router.route('/register').post(registerAdmin);
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
router.route('/profile').get(protect, admin, getAdminProfile);
router.put('/forgotPassword', changePassword);
router.put('/reset', resetPassword);

export default router;

//
