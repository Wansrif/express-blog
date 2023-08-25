import express from 'express';
import postController from '../controllers/postController.js';
import authJwt from '../middlewares/authJwt.js';

const postRouter = express.Router();
const { verifyToken, isAdmin } = authJwt;
const Admin = [verifyToken, isAdmin];

postRouter.get('/', verifyToken, postController.index);
postRouter.post('/', verifyToken, postController.store);
postRouter.get('/:id', verifyToken, postController.show);
postRouter.put('/:id', verifyToken, postController.update);
postRouter.delete('/:id', verifyToken, postController.destroy);

export default postRouter;
