import { inject, injectable } from "tsyringe";
import { IBcryptProvider } from "../../../shared/container/providers/Bcrypt/models/IBcryptProvider";
import { IJwtProvider } from "../../../shared/container/providers/JWT/models/IJwtProvider";
import AppError from "../../../shared/errors/AppError";
import { ICreateSession } from "../domain/models/ICreateSession";
import { IPayload } from "../domain/models/IPayload";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
export default class CreateSessionService {
    constructor (
        @inject('userRepository')
        private userRepository: IUserRepository,

        @inject('jwtProvider')
        private jwtProvider: IJwtProvider,
        
        @inject('bcryptProvider')
        private bcryptProvider: IBcryptProvider,
    ) {}

    public async execute ({ email, password }: ICreateSession): Promise<IPayload> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found');
        }

        const comparePassword = await this.bcryptProvider
            .compareHash(password, user.password);

        if (!comparePassword) {
            throw new AppError('Incorrect Password');
        }

        const token = this.jwtProvider.generateToken({
            email: user.email,
            id: user.id,
            name: user.name,
        });

        return {
            token,
            user,
        };
    }
}