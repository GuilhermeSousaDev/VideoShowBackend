import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
export default class CreateUserService {
    constructor (
        @inject('userRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute ({ name, email, password }: ICreateUser): Promise<IUser> {
        const emailExists = await this.userRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('This email already exists');
        }

        const user = await this.userRepository.create({
            name,
            email,
            password,
        });

        await this.userRepository.save(user);

        return user;
    }
}