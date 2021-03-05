import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import validateInfo from '../middleware/validateInfo';
import authorization from '../middleware/authorization';

const router = Router();

router.post('/register', validateInfo, async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await AuthController.register(username, password);
    return token.length > 0 ? res.json({ success: true, token }) :
    res.status(401).json({ success: false, message: 'User already exist!' });
  } catch (exception) {
    console.error(exception.message);
    const success = false;
    const message = 'Server Error!';
    const data = { success, message };
    return res.status(500).json(data);
  }
});

router.post('/login', validateInfo, async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await AuthController.login(username, password);
    return token.length > 0 ? res.json({ success: true, token }) :
    res.status(401).json({ success: false, message: 'Username or password is incorrect!' });
  } catch (exception) {
    console.error(exception.message);
    const success = false;
    const message = 'Server Error!';
    const data = { success, message };
    return res.status(500).json(data);
  }
});

router.get('/is-verified', authorization, async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (exception) {
    console.error(exception.message);
    const success = false;
    const message = 'Server Error!';
    const data = { success, message };
    return res.status(500).json(data);
  }
});

export default router;
