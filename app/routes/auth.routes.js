import express from 'express'
import { register, login, refreshToken } from '../controllers/auth.controller.js'

/**
 * Express router for handling authentication-related routes.
 * 
 * @type {express.Router}
 */
const router = express.Router()

/**
 * Route for user registration.
 * 
 * @name POST/api/auth/register
 * @function
 * @memberof router
 * @inner
 */
router.post('/register', register);

/**
 * Route for user login.
 * 
 * @name POST/api/auth/login
 * @function
 * @memberof router
 * @inner
 */
router.post('/login', login);

/**
 * Route for refreshing access tokens.
 * 
 * @name POST/api/auth/refresh
 * @function
 * @memberof router
 * @inner
 */
router.post('/refresh', refreshToken);

export default router