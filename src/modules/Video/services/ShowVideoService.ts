import { inject, injectable } from 'tsyringe';
import { IVideo } from '../domain/models/IVideo';
import { IVideoRepository } from '../domain/repositories/IVideoRepository';
import AppError from '../../../shared/errors/AppError';

@injectable()
export default class ShowVideoService {
    constructor (
        @inject('videoRepository')
        private videoRepository: IVideoRepository,
    ) {}

    public async execute (id: string): Promise<IVideo> {
        const video = await this.videoRepository.findVideoById(id);

        if (!video) {
            throw new AppError('Video not found');
        }

        return video;
    }
}