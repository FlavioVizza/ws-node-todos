import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

const ACCESS_TOKEN_SECRET = config.accessTokenSecret

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ success: false, message: 'Unauthorized, Access token is required'});

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) return res.status(403).send({ success: false, message: 'Unauthorized, Access token is invalid or expired'});
    
    req.userId = decodedToken._id;
    next();
  });
}

export { authenticateToken }