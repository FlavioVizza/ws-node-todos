![Banner](./assets/images/banner-nodejs-api.png)

# Description:

RESTful APIs for managing todo lists, allowing users to create, read, update, and delete todo items, built with Node.js, Express, and MongoDB.

# Features:

- User authentication with JWT (JSON Web Tokens)
- CRUD operations for todo items
- Secure password hashing
- Swagger Documentation

# Technologies Used:

- **Node.js:** Runtime for server-side development
- **Express:** Minimal and flexible Node.js web application framework
- **MongoDB:** NoSQL database
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js
- **Nodemon:** Utility that monitors changes in your Node.js application
- **Swagger:** Describe the structure of RESTful APIs 

# System Requirements:

Before running the application, make sure you have the following installed:

- Node.js (version 18.20.2 or higher)
- MongoDB (local or remote)
- Docker (optional, for containerized deployment)

# Installation:

1. Clone the repository:

```bash
git clone https://github.com/FlavioVizza/ws-node-todos.git
```

2. Navigate to the project directory:

```bash
cd ws-node-todos
```

3. Install dependencies:

```bash
npm install
```

# Configuration:

You can edit the `config.js` file or configure the following environment variables:

- `PORT`: Port number for the server (default is 3000)
- `TODOS_API_DB_URI`: MongoDB connection URI
- `ACCESS_TOKEN_SECRET`: Secret key for generating JWT access tokens
- `ACCESS_TOKEN_DURATION`: Duration for which access tokens are valid 
- `REFRESH_TOKEN_SECRET`: Secret key for generating JWT refresh tokens
- `REFRESH_TOKEN_DURATION`: Duration for which refresh tokens are valid

## MongoDB:

MongoDB can be configured by passing the connection string to the `TODOS_API_DB_URI` variable, and there are 2 options:

### 1. **Local**: 

Install MongoDB on your system.

Here's an example connection string for MongoDB running locally:
```bash
mongodb://localhost:27017/database_name
```

- `mongodb://`: Indicates that you are using MongoDB.
- `localhost`: Indicates that the MongoDB server is running on the same local machine.
- `27017`: Is the default port on which MongoDB listens for connections. Typically, it's the default port unless specified otherwise in the MongoDB configuration.
- `database_name`: Specifies the name of the database you want to connect to. You can replace "database_name" with the actual name of your database.


### 2. **MongoDB Atlas**: 

You can create an account on [MongoDB Atlas](https://www.mongodb.com/atlas/database) and follow the instructions to create a cluster and obtain the connection string.

Here's an example connection string for MongoDB:

```
mongodb+srv://username:password@clustername.mongodb.net/database_name
```

Here are the parts of the connection string:

- `mongodb+srv://`: Indicates that you are using MongoDB via the SRV protocol.
- `username:password`: Replace "username" with your username and "password" with your password to access MongoDB.
- `clustername.mongodb.net`: Replace "clustername" with the name of your MongoDB cluster.
- `database_name`: Specifies the name of the database you want to connect to. You can replace it with the name of your database.

# Usage:

### 1. Start the server:

```bash
npm run start
```

### 2. Use the following endpoints to interact with the Todos API:

- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Refresh token: `POST /api/auth/refresh-token`

- Get todo list: `GET /api/todos`
- Get todo item: `GET /api/todos/:id`
- Create todo item: `POST /api/todos`
- Update todo item: `PUT /api/todos/:id`
- Delete todo item: `DELETE /api/todos/:id`

### 3. API documentation using Swagger

You can view the API documentation using Swagger by navigating to the following URL in your browser:
```bash
http://localhost:3000/api-docs/
```

## Docker Deployment:
To deploy the application using Docker, follow these steps:

Build the Docker image:
```
docker build -t ws-node-todos .
```

Run the Docker container:
```
docker run --name ws-todos -p 3000:3000 -d ws-node-todos
```

The application should now be accessible at http://localhost:3000

Now it will be possible to start and stop the Docker container with the following commands:

```sh
docker start ws-todos
```

```sh
docker stop ws-todos
```
