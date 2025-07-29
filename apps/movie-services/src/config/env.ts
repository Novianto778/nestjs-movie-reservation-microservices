export default () => ({
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  authPort: process.env.AUTH_PORT,
  authHost: process.env.AUTH_HOST,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
});
