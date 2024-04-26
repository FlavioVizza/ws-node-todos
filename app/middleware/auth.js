import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

/**
 * Secret key used for decoding access tokens.
 * @type {string}
 */
const ACCESS_TOKEN_SECRET = config.accessTokenSecret

/**
 * Middleware function to authenticate access tokens.
 * It verifies the access token provided in the request header and decodes it using the configured secret key.
 * If the token is valid, it adds the decoded user ID to the request object.
 * If the token is missing or invalid, it sends an appropriate error response.
 * 
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
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