/**
 * Configuration object for the application.
 * It defines environment variables such as port, access token secret, refresh token secret,
 * and MongoDB URI. If environment variables are not provided, default values are used.
 * 
 * @typedef {Object} Config
 * @property {string} env - The environment mode for the application (e.g., 'development', 'production').
 * @property {number} port - The port number for the Express.js server.
 * @property {string} accessTokenSecret - The secret key used for generating access tokens.
 * @property {string} refreshTokenSecret - The secret key used for generating refresh tokens.
 * @property {string} mongodbUri - The MongoDB URI used for connecting to the database.
 */

/**
 * Configuration object containing environment variables for the application.
 * If environment variables are not provided, default values are used.
 * 
 * @type {Config}
 * @default
 */
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET',
  mongodbUri: process.env.TODOS_API_DB_URI || 'mongodb://localhost/todoapp'
}

export default config