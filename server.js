import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import helloRoutes from './app/routes/hello.routes.js'
import authRoutes from './app/routes/auth.routes.js'
import todosRoutes from './app/routes/todos.routes.js'
import config from './config/config.js'

const PORT = config.port

// setup express app
const app = express()
app.use(express.json());
app.use(cors())

// routes
app.use('/api',       helloRoutes)
app.use('/api/auth',  authRoutes);
app.use('/api/todos', todosRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todoapp')
  .then(  () => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// app
app.listen(PORT, (err) => {
	if (err) console.log(err)
	console.info(`🌈 Server started on port ${PORT}`)
})