import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SearchVideoService from '../../../services/SearchVideoService';

export default class SearchVideoController {
    public async index (req: Request, res: Response): Promise<Response> {
        const { title } = req.body;

        const searchVideo = container.resolve(SearchVideoService);

        const video = await searchVideo.execute(title);

        return res.json(video);
    }
}