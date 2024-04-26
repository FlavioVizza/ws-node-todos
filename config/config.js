/**
 * Configuration object containing environment variables and default values.
 * 
 * @typedef {Object} Config
 * @property {string} env - The current environment ('development' by default).
 * @property {number} port - The port number to run the server on (3000 by default).
 * @property {string} accessTokenSecret - The secret key for generating access tokens ('ACCESS_TOKEN_SECRET' by default).
 * @property {string} accessTokenDuration - The duration for which access tokens are valid ('15m' by default).
 * @property {string} refreshTokenSecret - The secret key for generating refresh tokens ('REFRESH_TOKEN_SECRET' by default).
 * @property {string} refreshTokenDuration - The duration for which refresh tokens are valid ('1d' by default).
 * @property {string} mongodbUri - The URI for connecting to MongoDB ('mongodb://localhost/todoapp' by default).
 */

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET',
  accessTokenDuration: process.env.ACCESS_TOKEN_DURATION || '15m',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET',
  refreshTokenDuration: process.env.REFRESH_TOKEN_DURATION || '1d',
  mongodbUri: process.env.TODOS_API_DB_URI || 'mongodb://localhost/todoapp'
}

export default config