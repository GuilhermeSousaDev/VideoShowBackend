import { Request, Response } from "express";
import { container } from "tsyringe";
import DeleteVideoService from "../../../services/DeleteVideoService";
import ListVideoByTitleService from "../../../services/ListVideoByTitleService";
import ListVideosService from "../../../services/ListVideosService";
import UploadVideoService from "../../../services/UploadVideoService";

export default class VideoController {
    public async index (req: Request, res: Response): Promise<Response> {
        const listVideos = container.resolve(ListVideosService);

        const videos = await listVideos.execute();

        return res.json(videos);
    }

    public async show (req: Request, res: Response): Promise<Response> {
        const { title } = req.body;

        const listVideoByTitle = container.resolve(ListVideoByTitleService);

        const video = await listVideoByTitle.execute(title);

        return res.json(video);
    }

    public async create (req: Request, res: Response): Promise<Response> {
        const { title, description } = req.body;
        const { filename } = req.file;

        const uploadVideo = container.resolve(UploadVideoService);

        const video = await uploadVideo.execute({ 
            title, 
            description,
            video: filename,
        });

        return res.json(video);
    }

    public async delete (req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteVideoService = container.resolve(DeleteVideoService);

        await deleteVideoService.execute(id);

        return res.json([]);
    }
}