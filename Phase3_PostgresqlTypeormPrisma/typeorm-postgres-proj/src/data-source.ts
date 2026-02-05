import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Group } from "./entity/groups";
import { Post } from "./entity/post";
import { Profile } from "./entity/profile";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Ragini1234",
    database: "typeorm_db",
    synchronize: true,   // WARNING: Only for dev, auto creates tables
    logging: false,
    entities: [User, Profile, Post, Group],
    migrations: [],
    subscribers: [],
});
