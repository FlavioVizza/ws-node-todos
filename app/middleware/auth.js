import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

const ACCESS_TOKEN_SECRET = config.accessTokenSecret

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) return res.sendStatus(403);
    
    req.userId = decodedToken._id;
    next();
  });
}

export { authenticateToken }