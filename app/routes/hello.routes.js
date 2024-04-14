import express from 'express'
import { helloMsg } from '../controllers/hello.controller.js'

/**
 * Express router for handling hello-related routes.
 * 
 * @type {express.Router}
 */
const router = express.Router()

/**
 * Route for retrieving a hello message.
 * 
 * @name GET/api/hello
 * @function
 * @memberof router
 * @inner
 */
router.route('/hello').get(helloMsg)

export default router