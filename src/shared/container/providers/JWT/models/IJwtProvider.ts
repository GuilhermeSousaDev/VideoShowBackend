import { ICreateToken } from "./ICreateToken";
import { JwtPayload } from 'jsonwebtoken';

export interface IJwtProvider {
    generateToken ({ email, id, name }: ICreateToken): string;
    verifyToken (token: string, secret: string): string | JwtPayload;  
}