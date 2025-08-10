const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');

// const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Not authorized, token failed' });
//   }
// };


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect,getMe);

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
