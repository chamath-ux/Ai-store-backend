const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1m', // short-lived
  });
};

exports.generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d', // long-lived
  });
};

exports.setAccessToken = (token) =>{
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid refresh token' });

    const accessToken = jwt.sign(
      { userId: user.userId, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1m' }
    );

   return accessToken;
  });
}