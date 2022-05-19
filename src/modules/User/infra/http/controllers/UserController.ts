import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../../../services/CreateUserService";
import DeleteUserService from "../../../services/DeleteUserService";
import ListUsersService from "../../../services/ListUsersService";
import ShowUserService from "../../../services/ShowUserService";

export default class UserController {
    public async index (req: Request, res: Response): Promise<Response> {
        const listUsers = container.resolve(ListUsersService);

        const users = await listUsers.execute();

        return res.json(users);
    }

    public async show (req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showUser = container.resolve(ShowUserService);

        const user = await showUser.execute(id);

        return res.json(user);
    }

    public async create (req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({ email, name, password });

        return res.json(user);
    }

    public async delete (req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteUser = container.resolve(DeleteUserService);

        const user = await deleteUser.execute(id);

        return res.json(user);
    }
}