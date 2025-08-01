export default () => ({
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  databaseUrl: process.env.DATABASE_URL,
  tcpPort: process.env.TCP_PORT,
});
