const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET'
}

export default config