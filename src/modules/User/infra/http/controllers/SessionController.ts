import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateSessionService from "../../../services/CreateSessionService";

export default class SessionController {
    public async index (req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const createSession = container.resolve(CreateSessionService);

        const session = await createSession.execute({ email, password });

        return res.json(session);
    }
}