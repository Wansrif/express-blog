/* ---------------------------------- */
/* Role Router Documentation */
/* ---------------------------------- */
/* The provided code defines an Express router for handling routes related to roles. The router utilizes the "authJwt" middleware for authentication and authorization, including the "verifyToken", "isAdmin", and "emailVerified" functions. This router is associated with the "roleController" and manages routes for CRUD operations on roles, accessible by admin users with verified emails. */

import express from 'express';
import authJwt from '../middlewares/authJwt.js';
import roleController from '../controllers/roleController.js';

const roleRouter = express.Router();

const { verifyToken, isAdmin, emailVerified } = authJwt;
const AdminWithEmailVerification = [verifyToken, isAdmin, emailVerified];

/* Route: GET /
 * Description: Retrieve a list of all roles.
 * Middleware: Requires token verification, admin privileges, and email verification.
 */
roleRouter.get('/', AdminWithEmailVerification, roleController.index);

/* Route: POST /
 * Description: Create a new role.
 * Middleware: Requires token verification, admin privileges, and email verification.
 */
roleRouter.post('/', AdminWithEmailVerification, roleController.store);

/* Route: PUT /:id
 * Description: Update an existing role by ID.
 * Middleware: Requires token verification, admin privileges, and email verification.
 */
roleRouter.put('/:id', AdminWithEmailVerification, roleController.update);

/* Route: DELETE /:id
 * Description: Delete a role by ID.
 * Middleware: Requires token verification, admin privileges, and email verification.
 */
roleRouter.delete('/:id', AdminWithEmailVerification, roleController.destroy);

export default roleRouter;
