import mongoose from 'mongoose'

/**
 * Schema definition for the Todo model.
 * It defines the structure of todo documents in the MongoDB collection.
 * 
 * @typedef {Object} TodoSchema
 * @property {mongoose.Schema.ObjectId} userId - The ID of the user associated with the todo.
 * @property {number} todoId - The unique identifier for the todo.
 * @property {string} title - The title of the todo.
 * @property {string} description - The description of the todo.
 * @property {boolean} completed - Indicates whether the todo is completed or not.
 * @property {Date} createAt - The date when the todo was created.
 */

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId, 
    ref: 'User'
  },
  todoId: {
    type: Number,
    unique: true
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  completed: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Middleware function to generate a unique todoId before saving a new todo.
 */
todoSchema.pre('save', async function(next){
  try {
    if(!this.isNew) return next()

    // Find the last todoId by sorting in descending order and taking only the first document
    const lastTodo = await this.constructor.findOne({}, {}, { sort: { 'todoId': -1 } });

    this.todoId = lastTodo? lastTodo.todoId + 1 : 1;

    next()

  } 
  catch (error) { next(error) }
})

export default mongoose.model('Todo', todoSchema);