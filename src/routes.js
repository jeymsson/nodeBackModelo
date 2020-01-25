import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', async (req, res) => {
    return res.json({ Hello: 'world' });
});
routes.post('/session', SessionController.store);
routes.use(authMiddleware);
routes.post('/user', UserController.store);
routes.get('/user', UserController.list);

routes.put('/user', UserController.update);

export default routes;
