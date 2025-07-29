
const jwt = require('jsonwebtoken');

exports.Authenticate =async(req, res, next)=> {
     const authHeader = req.headers['authorization'];
  

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // you can access req.user in other routes
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
 
}