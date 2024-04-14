import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import helloRoutes from './app/routes/hello.routes.js'
import authRoutes from './app/routes/auth.routes.js'
import todosRoutes from './app/routes/todos.routes.js'
import config from './config/config.js'

const PORT = config.port
const MONGO_URI = config.mongodbUri

// setup express app
const app = express()
app.use(express.json());
app.use(cors())

// routes
app.use('/api',       helloRoutes)
app.use('/api/auth',  authRoutes);
app.use('/api/todos', todosRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(  () => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// swagger
const jsonString = readFileSync(`${process.cwd()}/doc/swagger.json`, 'utf-8');
const swaggerConfig = JSON.parse(jsonString);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(`${process.cwd()}/doc/swagger.json`);
});

// app
app.listen(PORT, (err) => {
	if (err) console.log(err)
	console.info(`🌈 Server started on port ${PORT}`)
})