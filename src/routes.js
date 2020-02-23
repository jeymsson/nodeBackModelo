// Routes
import { Router } from 'express';
// Multipart files
import multer from 'multer';
import multerConfig from './config/multer';
// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
// Middwares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', async (req, res) => {
    return res.json({ Hello: 'world' });
});
routes.post('/session', SessionController.store);
routes.use(authMiddleware);
routes.post('/user', UserController.store);
routes.get('/user', UserController.list);

routes.put('/user', UserController.update);

routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({ ok: true });
});

export default routes;
