import { JwtPayload, sign, verify } from "jsonwebtoken";
import { auth } from "../../../../../config/auth";
import { ICreateToken } from "../models/ICreateToken";
import { IJwtProvider } from "../models/IJwtProvider";

export default class JwtProvider implements IJwtProvider {
    public generateToken({ email, id, name }: ICreateToken): string {
        const token = sign(
            { email, id, name }, auth.secret, { expiresIn: auth.expiresIn }
        );

        return token;
    }

    public verifyToken(token: string): string | JwtPayload {
        const verifiedToken = verify(token, auth.secret);

        return verifiedToken;
    }
}