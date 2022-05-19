import { hash } from "bcryptjs";
import { 
    Entity,
    Column, 
    CreateDateColumn, 
    ObjectID, 
    ObjectIdColumn, 
    UpdateDateColumn,
    BeforeInsert,
} from "typeorm";

@Entity('user')
export default class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ default: () => "NOW()"})
    createdAt: Date;

    @UpdateDateColumn({ default: () => "NOW()"})
    updatedAt: Date;

    @BeforeInsert()
    async hashedPassword() {
        this.password = await hash(this.password, 8);
    }
}