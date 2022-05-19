import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { auth } from "../../../../config/auth";
import { IToken } from "../../../../config/IToken";
import AppError from "../../../errors/AppError";

export default function isAuthenticated (
    req: Request, res: Response, next: NextFunction
) {
    const token = req.headers.authorization;

    if (!token) {
        throw new AppError('Token not found');
    }

    try {
        verify(token, auth.secret);

        const { email, id, name } = decode(token) as IToken;

        req.user = {
            email,
            id,
            name,
        }

        next();
    } catch (error) {
        throw new AppError('Invalid Token');
    }
}