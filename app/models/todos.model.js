import mongoose from 'mongoose'

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

todoSchema.pre('save', async function(next){
  try {
    if(!this.isNew) return next()

    // Trova l'ultimo todoId ordinando per ordine decrescente e prendendo solo il primo documento
    const lastTodo = await this.constructor.findOne({}, {}, { sort: { 'todoId': -1 } });

    this.todoId = lastTodo? lastTodo.todoId + 1 : 1;

    next()

  } 
  catch (error) { next(error) }
})

export default mongoose.model('Todo', todoSchema);