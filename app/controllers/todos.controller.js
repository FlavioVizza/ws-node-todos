import Todo from '../models/todos.model.js'
import mongoose from 'mongoose'

/**
 * Retrieves the list of todos associated with the authenticated user.
 * 
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
async function getTodoList(req, res) {
  try {
     const userIdObject = mongoose.Types.ObjectId.createFromHexString(req.userId);
     const todos = await Todo.find({ userId: userIdObject })
                             .select("-_id todoId title description completed createAt");
     res.json(todos);
  } catch (error) {
    console.log(error)
    res.status(500).send({success: false, message:'Error getting todos list'});
  }
}

/**
 * Retrieves a specific todo item by its ID.
 * 
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
async function getTodoItem(req, res) {
  try {
    const todo = await Todo.findOne({ todoId: req.params.id, userId: req.userId })
                           .select("-_id todoId title description completed createAt");

    if (!todo) return res.status(404).send({success: false, message: 'Todo item not found'});
    res.json(todo);
  } catch (error) {
    console.log(error)
    res.status(500).send({success: false, message:'Error getting todo item'});
  }
}

/**
 * Creates a new todo item.
 * 
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
async function postTodoItem(req, res) {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description, userId: req.userId });
    await todo.save();
    res.status(201).send({success: true, message: 'Todo item created successfully'});
  } catch (error) {
    console.log(error)
    res.status(500).send({success: false, message:'Error creating todo item'});
  }
}

/**
 * Deletes a specific todo item by its ID.
 * 
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
async function deleteTodoItem(req, res) {
  try {
    await Todo.deleteOne({ todoId: req.params.id, userId: req.userId });
    res.status(200).send({success: true, message: 'Todo item deleted successfully'});
  } catch (error) {
    res.status(500).send({success: false, message: 'Error deleting todo item'});
  }
}

/**
 * Updates a specific todo item by its ID.
 * 
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
async function putTodoItem(req, res) {
  try {
    const { title, description, completed } = req.body;
    await Todo.findOneAndUpdate({ todoId: req.params.id, userId: req.userId }, { title, description, completed });
    res.status(200).send({success: true, message: 'Todo item updated successfully'});
  } catch (error) {
    console.log(error)
    res.status(500).send({success: false, message: 'Error updating todo item'});
  }
}

export { getTodoList, getTodoItem, postTodoItem, deleteTodoItem, putTodoItem }