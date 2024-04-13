import express from 'express'
import { helloMsg } from '../controllers/hello.controller.js'

const router = express.Router()

router.route('/hello').get(helloMsg)

export default router