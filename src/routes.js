import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'admin',
        email: 'admin@email.com',
        password_hash: '4132452102',
    });
    return res.json({ user });
});

export default routes;
