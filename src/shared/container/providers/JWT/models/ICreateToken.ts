import { ObjectID } from "typeorm";

export interface ICreateToken {
    id: ObjectID;
    name: string;
    email: string;
}