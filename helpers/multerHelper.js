/* ------------------------------ */
/* Cloudinary and Multer Setup */
/* ------------------------------ */
/* The provided code configures Cloudinary integration and sets up a Multer middleware for file uploads. Cloudinary is used for cloud-based image storage and processing. Multer is used to handle multipart/form-data, allowing file uploads. */

import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

/* Configure Cloudinary */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/* Set up multer storage using Cloudinary */
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      return `${file.fieldname}-${uniqueSuffix}`;
    },
  },
});

/* Create the upload middleware */
const upload = multer({ storage: storage });

export default upload;
