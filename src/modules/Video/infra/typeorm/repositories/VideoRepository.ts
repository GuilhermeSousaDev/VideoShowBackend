import { getRepository, Like, Repository } from "typeorm";
import { ICreateVideo } from "../../../domain/models/ICreateVideo";
import { IVideo } from "../../../domain/models/IVideo";
import { IVideoRepository } from "../../../domain/repositories/IVideoRepository";
import Video from "../entities/Video";

export default class VideoRepository implements IVideoRepository {
    ormRepository: Repository<Video>;

    constructor () {
        this.ormRepository = getRepository(Video);
    }

    public async save(video: IVideo): Promise<IVideo> {
        return this.ormRepository.save(video);
    }

    public async create({ title, description, video }: ICreateVideo): Promise<IVideo> {
        return this.ormRepository.create({
            title,
            description,
            video,
        });
    }

    public async delete(videos: IVideo[]): Promise<void> {
        this.ormRepository.remove(videos);
    }

    public async find(): Promise<IVideo[]> {
        return this.ormRepository.find();
    }

    public async findVideoById(id: string): Promise<IVideo> {
        return this.ormRepository.findOne(id);
    }

    public async search(title: string): Promise<IVideo[]> {
        return this.ormRepository.find({
            where: {
                title: Like(`%${title}%`),
            },
        });
    }
}