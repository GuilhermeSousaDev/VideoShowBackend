import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { IVideo } from '../domain/models/IVideo';
import { IVideoRepository } from '../domain/repositories/IVideoRepository';
import AppError from '../../../shared/errors/AppError';

interface IShowVideo {
    id: string;
    range: string;
}

//Not Finalized

@injectable()
export default class ListVideoByIdService {
    constructor (
        @inject('videoRepository')
        private videoRepository: IVideoRepository,
    ) {}

    public async execute ({ id, range }: IShowVideo): Promise<fs.ReadStream> {
        const video = await this.videoRepository.findVideoById(id);

        if (!video) {
            throw new AppError('Video not found');
        }

        if (!range) {
            throw new AppError('Requires Range header');
        }

        const videoPath = `uploads/${video.video}`;
        const videoSize = fs.statSync(videoPath).size;

        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        /*const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `Bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers); */

        const videoStream = fs.createReadStream(videoPath, { start, end });

        return videoStream;
    }
}