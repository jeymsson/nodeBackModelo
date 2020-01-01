import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', async (req, res) => {
    return res.json({ Hello: 'world' });
});
routes.post('/user', UserController.store);

export default routes;
