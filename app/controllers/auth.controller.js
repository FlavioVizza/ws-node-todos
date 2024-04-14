import jwt  from 'jsonwebtoken'
import User from '../models/user.model.js'
import config from '../../config/config.js'

// Generate access token
const ACCESS_TOKEN_SECRET = config.accessTokenSecret
function generateAccessToken(user) {
  return jwt.sign({ _id: user._id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

// Generate refresh token
const REFRESH_TOKEN_SECRET = config.refreshTokenSecret
function generateRefreshToken(user) {
  return jwt.sign({ _id: user._id }, REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ 
			username,
      email,
			password 
		});
    await user.save();
    res.status(201).send({success: true, message: 'User registered successfully'});
  } catch (error) {
    console.log(error)
    res.status(500).send({success: false, message:'Error registering user'});
  }
}

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
		if (!user) return res.status(400).send({ success: false, message: 'Invalid username or password'});

		const validPassword = user.authenticate(password)
		if (!validPassword) return res.status(401).send({ success: false, message: 'Invalid password'});
    
		const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
		res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error)

    res.status(500).send({success: false, message: 'Error logging in'});
  }
}

// Refresh access token
const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.status(401).send({ success: false, message: 'Refresh token is required'});
	
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send({ success: false, message: 'Refresh token is invalid or expired'});
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
		res.json({ accessToken, refreshToken });
  });
}

export { register, login, refreshToken }