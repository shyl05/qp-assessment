import { Router } from 'express';
import userController from '../controllers/user.controller';
import { verifyAdmin } from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('/getAll', verifyAdmin, userController.getAll);
userRouter.get('/getById', verifyAdmin, userController.getById);
userRouter.post('/register', userController.create);
userRouter.post('/login', userController.login);


export default userRouter;