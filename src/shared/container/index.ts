import { container } from 'tsyringe';
import { IUserRepository } from '../../modules/User/domain/repositories/IUserRepository';
import { IVideoRepository } from '../../modules/Video/domain/repositories/IVideoRepository';
import UserRepository from '../../modules/User/infra/typeorm/repositories/UserRepository';
import VideoRepository from '../../modules/Video/infra/typeorm/repositories/VideoRepository';

import '../container/providers/JWT';
import '../container/providers/Bcrypt';

container.registerSingleton<IUserRepository>(
    'userRepository',
    UserRepository,
);

container.registerSingleton<IVideoRepository>(
    'videoRepository',
    VideoRepository,
);