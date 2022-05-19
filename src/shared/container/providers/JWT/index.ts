import { container } from 'tsyringe';
import JwtProvider from './implementations/JwtProvider';
import { IJwtProvider } from './models/IJwtProvider';

container.registerSingleton<IJwtProvider>(
    'jwtProvider',
    JwtProvider,
);