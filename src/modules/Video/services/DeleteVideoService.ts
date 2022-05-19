import { inject, injectable } from "tsyringe";
import { IVideoRepository } from "../domain/repositories/IVideoRepository";
import AppError from '../../../shared/errors/AppError';
import DiskStorageProvider from '../../../shared/providers/StorageProvider/DiskStorageProvider';

@injectable()
export default class DeleteVideoService {
    constructor (
        @inject('videoRepository')
        private videoRepository: IVideoRepository,
    ) {}

    public async execute (id: string): Promise<void> {
        const video = await this.videoRepository.findVideoById(id);

        if (!video) {
            throw new AppError('Video not found');
        }

        const diskStorage = new DiskStorageProvider();

        await diskStorage.delete(video.video);

        await this.videoRepository.delete(video);
    }
}