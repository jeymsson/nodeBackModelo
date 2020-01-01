import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', async (req, res) => {
    return res.json({ Hello: 'world' });
});
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

export default routes;
