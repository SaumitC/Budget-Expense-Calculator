const jwt = require('jsonwebtoken');
const UserModel  = require('../models/user');

async function authenticateToken(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Missing or invalid Bearer token' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded)
    // if (isTokenExpired(decoded)) {
    //   return res.status(401).json({ error: 'Token has expired' });
    // }

    const user = await UserModel.findById(decoded.userId);
console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

function isTokenExpired(decoded) {
  const currentTimeInSeconds = Date.now() / 1000;
  return decoded.exp < currentTimeInSeconds;
}

module.exports = {
  authenticateToken,
};
