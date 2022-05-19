import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
export default class DeleteUserService {
    constructor (
        @inject('userRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute (id: string): Promise<void> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError('User not found');
        }

        this.userRepository.remove(user);
    }
}