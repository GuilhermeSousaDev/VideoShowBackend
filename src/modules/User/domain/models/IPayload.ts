import { IUser } from "./IUser";

export interface IPayload {
    token: string;
    user: IUser;
}