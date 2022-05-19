import { inject, injectable } from "tsyringe";
import { IVideo } from "../domain/models/IVideo";
import { IVideoRepository } from "../domain/repositories/IVideoRepository";

@injectable()
export default class ListVideosService {
    constructor (
        @inject('videoRepository')
        private videoRepository: IVideoRepository,
    ) {}

    public async execute (): Promise<IVideo[]> {
        const videos = await this.videoRepository.find();

        return videos;
    }
}