import { ICreateVideo } from "../models/ICreateVideo";
import { IVideo } from "../models/IVideo";

export interface IVideoRepository {
    save (video: IVideo): Promise<IVideo>;
    create (data: ICreateVideo): Promise<IVideo>;
    delete (videos: IVideo[] | IVideo): Promise<void>;
    find (): Promise<IVideo[]>;
    findVideoById (id: string): Promise<IVideo>;
    search (title: string): Promise<IVideo[]>;
}