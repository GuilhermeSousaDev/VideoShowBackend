import { ObjectID } from "typeorm";

export interface IUser {
    id: ObjectID;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}