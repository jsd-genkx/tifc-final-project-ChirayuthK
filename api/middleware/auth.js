const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Use a more secure key in production

function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, secretKey };
