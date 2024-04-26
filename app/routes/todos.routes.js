import express from 'express'
import { authenticateToken } from '../middleware/auth.js' 
import { getTodoList, getTodoItem, postTodoItem, deleteTodoItem, putTodoItem } from '../controllers/todos.controller.js'

/**
 * Express router for handling todo-related routes.
 * 
 * @type {express.Router}
 */
const router = express.Router()

/**
 * Route for retrieving the list of todos.
 * 
 * @name GET/api/todos
 * @function
 * @memberof router
 * @inner
 */
router.get( '/', authenticateToken, getTodoList);

/**
 * Route for creating a new todo item.
 * 
 * @name POST/api/todos
 * @function
 * @memberof router
 * @inner
 */
router.post('/', authenticateToken, postTodoItem);

/**
 * Route for retrieving a specific todo item.
 * 
 * @name GET/api/todos/:id
 * @function
 * @memberof router
 * @inner
 */
router.get( '/:id', authenticateToken, getTodoItem);

/**
 * Route for deleting a specific todo item.
 * 
 * @name DELETE/api/todos/:id
 * @function
 * @memberof router
 * @inner
 */
router.delete('/:id', authenticateToken, deleteTodoItem);

/**
 * Route for updating a specific todo item.
 * 
 * @name PUT/api/todos/:id
 * @function
 * @memberof router
 * @inner
 */
router.put('/:id', authenticateToken, putTodoItem);

export default router