/* ----------------------- */
/* Cloudinary Configuration */
/* ----------------------- */
/* The provided code configures Cloudinary integration using environment variables loaded from the .env file. It sets up the Cloudinary client for cloud-based image storage and processing. */

import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

/* Configure Cloudinary */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
