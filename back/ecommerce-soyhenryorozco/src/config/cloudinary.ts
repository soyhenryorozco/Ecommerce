import { v2 as cloudinary } from 'cloudinary';
import { config as dotenvconfig } from 'dotenv';

dotenvconfig({ path: '.development.env' });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export default cloudinary;
