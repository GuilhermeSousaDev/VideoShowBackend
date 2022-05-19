import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import upload from '../../../config/upload';

interface IDiskStorage {
    filename: string, 
    buffer: Buffer,
}

export default class DiskStorageProvider {
    public async save ({ filename, buffer }: IDiskStorage): Promise<void> {
        const video = fs.createWriteStream(`uploads/${filename}`);

        video.write(buffer);
    }

    public async delete (filename: string): Promise<void> {
        const filePath = path.resolve(upload.directory, filename);
        const statAsync = promisify(fs.stat);
        const unlinkAsync = promisify(fs.unlink);

        try {
            await statAsync(filePath);
        } catch {
            return;
        }

        await unlinkAsync(filePath);
    }
}