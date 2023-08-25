/* ------------------------------------- */
/* Profile Router Documentation */
/* ------------------------------------- */
/* The provided code defines an Express router for handling routes related to user profiles. The router utilizes the "authJwt" middleware for token verification. This router is associated with the "profileController" and manages routes for retrieving user profile data. */

import express from 'express';
import authJwt from '../middlewares/authJwt.js';
import profileController from '../controllers/profileController.js';

const profileRouter = express.Router();

const { verifyToken } = authJwt;

/* Route: GET /
 * Description: Retrieve the user's profile data.
 * Middleware: Requires token verification.
 */
profileRouter.get('/', verifyToken, profileController.index);

export default profileRouter;
