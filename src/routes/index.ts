import { Router } from 'express';
import userRouter from './user.route';
import groceryRouter from './grocery.route';
import orderRouter from './order.route';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/grocery', groceryRouter);
routes.use('/order', orderRouter);

export default routes;