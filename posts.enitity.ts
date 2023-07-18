import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {UsersEntity} from "./users.entity";

@Entity()
export class PostsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @OneToOne(() => UsersEntity)
    @JoinColumn()
    user: UsersEntity
}
