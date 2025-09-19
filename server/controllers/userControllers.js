const User = require('../models/user');
const Note = require('../models/Note');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (email) => {
  return jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1d' });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user.email);

    res.status(201).json({
      token,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user.email);

    res.status(200).json({
      token,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserProfile = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const totalNotes = await Note.countDocuments({ email });

    res.status(200).json({
      name: user.name,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      totalNotes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
