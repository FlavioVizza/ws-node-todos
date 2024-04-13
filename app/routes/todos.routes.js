import express from 'express'
import { authenticateToken } from '../middleware/auth.js' 
import { getTodoList, getTodoItem, postTodoItem, deleteTodoItem, putTodoItem } from '../controllers/todos.controller.js'

const router = express.Router()

router.get(   '/',    authenticateToken, getTodoList);
router.get(   '/:id', authenticateToken, getTodoItem);
router.post(  '/',    authenticateToken, postTodoItem);
router.delete('/:id', authenticateToken, deleteTodoItem);
router.put(   '/:id', authenticateToken, putTodoItem);

export default router