import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const uploadFolder = resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadFolder,
    multer: {
        storage: multer.diskStorage({
            destination: uploadFolder,
            filename: (req, file, callback) => {
                const fileHash = crypto.randomBytes(10).toString('hex');
        
                const filename = `${fileHash}-${file.originalname}`;
        
                callback(null, filename);
            }
        }),
    },
};