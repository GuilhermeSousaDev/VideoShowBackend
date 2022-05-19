import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import { ICreateVideo } from "../domain/models/ICreateVideo";
import { IVideo } from "../domain/models/IVideo";
import { IVideoRepository } from "../domain/repositories/IVideoRepository";

@injectable()
export default class UploadVideoService {
    constructor (
        @inject('videoRepository')
        private videoRepository: IVideoRepository,
    ) {}

    public async execute ({ 
        title, 
        description, 
        video,
    }: ICreateVideo): Promise<IVideo> {
        const videoTitle = await this.videoRepository.findVideoByTitle(title);

        if (videoTitle) {
            throw new AppError('This title already exists');
        }

        const createdVideo = await this.videoRepository.create({ 
            title,
            description,
            video,
        });

        await this.videoRepository.save(createdVideo);

        return createdVideo;
    }
}