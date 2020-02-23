import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
    // how Multer will be store files.
    storage: multer.diskStorage({
        // Destination
        destination: resolve(__dirname, '..', '..', 'tpm', 'uploads'),
        // Filename
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err);
                return cb(null, res.toString('hex') + file.originalname);
                // return cb(null, res.toString('hex') +extname(file.originalname));
            });
        },
    }),
};
