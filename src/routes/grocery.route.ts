import { Router } from 'express';
import groceryController from '../controllers/grocery.controller';
import { verifyAdmin } from '../middlewares/auth.middleware';

const groceryRouter = Router();

groceryRouter.get('/getAll', groceryController.getAll);
groceryRouter.get('/getAvailable', groceryController.getAvailableItems);
groceryRouter.get('/getById', groceryController.getById);
groceryRouter.get('/getByName', groceryController.getByName);
groceryRouter.get('/getByType', groceryController.getByType);
groceryRouter.post('/createNew', verifyAdmin, groceryController.create);
groceryRouter.patch('/updateItem', verifyAdmin, groceryController.update);
groceryRouter.delete('/deleteItem', verifyAdmin, groceryController.deleteItem);

export default groceryRouter;