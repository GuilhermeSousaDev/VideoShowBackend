import { ObjectID } from "typeorm";

export interface IVideo {
    id: ObjectID;
    title: string;
    description: string;
    video: string;
    createdAt: Date;
    updatedAt: Date;
}