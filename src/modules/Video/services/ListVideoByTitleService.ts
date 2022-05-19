import { inject, injectable } from "tsyringe";
import { IVideo } from "../domain/models/IVideo";
import { IVideoRepository } from "../domain/repositories/IVideoRepository";

@injectable()
export default class ListVideoByTitleService {
    constructor (
        @inject('videoRepository')
        private videoRepository: IVideoRepository,
    ) {}

    public async execute (title: string): Promise<IVideo> {
        const video = await this.videoRepository.findVideoByTitle(title);

        return video;
    }
}