// src/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken, setAccessToken} = require('../services/authServices');

exports.register = async (req, res) => {
  try {
    const { name, email, password,isAdmin } = req.body;
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed,isAdmin });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid password' });

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

       res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
       // secure: process.env.NODE_ENV === 'production', // set true in production
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: 'No refresh token' });

  const accessToken = setAccessToken(token);
  res.json({ accessToken });
  
};

exports.logout = (req, res) =>
{
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Strict' });
    res.json({ message: 'Logged out successfully' });
}
