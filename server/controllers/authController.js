const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// @route POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: 'Email already registered' });

  const user = await User.create({ username, email, password });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id)
  });
};

// @route POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id)
  });
};
