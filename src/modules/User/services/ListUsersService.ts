import { inject, injectable } from "tsyringe";
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
export default class ListUsersService {
    constructor (
        @inject('userRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute (): Promise<IUser[]> {
        const user = await this.userRepository.find();

        return user;
    }
}