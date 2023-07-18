import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {PostsEntity} from "./posts.enitity";

@Entity({name: 'users'})
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar"})
    name: string

    @Column()
    age: number

    @Column()
    email: string

    @OneToOne(() => PostsEntity)
    post: PostsEntity
}
