import {Request, Response} from "express";
import {DataSource} from "typeorm";
import express from 'express'
import {UsersEntity} from "./users.entity";
import {PostsEntity} from "./posts.enitity";
import {isNumberObject} from "util/types";

const dotenv = require('dotenv').config()

const app = express()
const port = process.env.APP_PORT
const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    synchronize: true,
    logging: true,
    entities: [UsersEntity, PostsEntity],
    subscribers: [],
    migrations: [],
})
AppDataSource.initialize().then(() => console.log("Connected to DB Successfully!")).catch(err => console.log(err))

app.use(express.json())

const usersRepository = AppDataSource.getRepository(UsersEntity)
const postsRepository = AppDataSource.getRepository(PostsEntity)

app.get('/getUsers', async (req: Request, res: Response) => {
    const data = await usersRepository.find({where: {id: 1}, relations: ['post']})
    res.send(data)
})

app.post('/createUser', async (req: Request, res: Response) => {
    const body = req.body
    const user = usersRepository.create({name: body.name, age: body.age, email: body.email})
    await usersRepository.save(user)
    res.send(user)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
