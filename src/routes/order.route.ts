import { Router } from 'express';
import orderController from '../controllers/order.controller';
import { verifyUser } from '../middlewares/auth.middleware';

const orderRouter = Router();

orderRouter.get('/getOrder', verifyUser, orderController.getAll);
orderRouter.post('/orderItems', verifyUser, orderController.orderItems);

export default orderRouter;