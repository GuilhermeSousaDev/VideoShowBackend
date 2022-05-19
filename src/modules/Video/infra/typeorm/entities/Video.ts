import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    ObjectID, 
    ObjectIdColumn, 
    UpdateDateColumn,
} from "typeorm";
import { IVideo } from "../../../domain/models/IVideo";

@Entity('videos')
export default class Video implements IVideo {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    video: string;

    @Column()
    description: string;

    @CreateDateColumn({ default: () => "NOW()" })
    createdAt: Date;

    @UpdateDateColumn({ default: () => "NOW()" })
    updatedAt: Date;
}