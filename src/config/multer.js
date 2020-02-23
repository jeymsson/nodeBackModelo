import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tpm', 'uploads'),
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (cb) return cb(err);
            });
            // eslint-disable-next-line no-undef
            return cb(null, res.toString('hex') + file.originalname);
        },
    }),
};
