/* ---------------------------- */
/* Express App Configuration */
/* ---------------------------- */
/* The provided code configures an Express application with middleware and routes. It sets up the server to listen on a specified port, handles routes, and manages error handling. */

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import fileUpload from 'express-fileupload';

import authRouter from './routes/authRoutes.js';
import postRouter from './routes/postRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import roleRouter from './routes/roleRoutes.js';
import documentationRouter from './documentation/documentation.js';

const port = process.env.NODE_PORT || 3000;

const app = express();
connectDB();

/* Middlewares */
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

/* Default route */
app.use('/', documentationRouter);

/* Route handlers */
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/profile', profileRouter);
app.use('/api/role', roleRouter);

/* 404 Not Found handler */
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status_code = 404;
  next(error);
});

/* Error handler */
app.use((error, req, res, next) => {
  res.status(error.status_code || 500);
  res.json({
    status: 'error',
    status_code: error.status_code || 500,
    message: error.message,
  });
});

/* Start the server */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
