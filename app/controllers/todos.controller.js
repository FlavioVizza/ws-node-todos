import Todo from '../models/todos.model.js'
import mongoose from 'mongoose'
 
// Get todo list
async function getTodoList(req, res) {
  try {
     const userIdObject = mongoose.Types.ObjectId.createFromHexString(req.userId);
     const todos = await Todo.find({ userId: userIdObject });
     res.json(todos);
  } catch (error) {
    console.log(error)
    res.status(500).send({success: false, message:'Error getting todos list'});
  }
}

// Get todo item by ID
async function getTodoItem(req, res) {
  try {
    const todo = await Todo.findOne({ todoId: req.params.id, userId: req.userId });
    if (!todo) return res.status(404).send({success: false, message: 'Todo item not found'});
    res.json(todo);
  } catch (error) {
    console.log(error)
    res.status(500).send({success: false, message:'Error getting todo item'});
  }
}

// Create new todo item
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

// Delete todo item by ID
async function deleteTodoItem(req, res) {
  try {
    await Todo.deleteOne({ todoId: req.params.id, userId: req.userId });
    res.status(204).send({success: true, message: 'Todo item deleted successfully'});
  } catch (error) {
    res.status(500).send({success: false, message: 'Error deleting todo item'});
  }
}

// Update todo item by ID
async function putTodoItem(req, res) {
  try {
    const { title, description, completed } = req.body;
    await Todo.findOneAndUpdate({ todoId: req.params.id, userId: req.userId }, { title, description, completed });
    res.status(204).send({success: true, message: 'Todo item updated successfully'});
  } catch (error) {
    console.log(error)
    res.status(500).send({success: false, message: 'Error updating todo item'});
  }
}

export { getTodoList, getTodoItem, postTodoItem, deleteTodoItem, putTodoItem }