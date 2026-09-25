import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"
import dotenv from 'dotenv';
dotenv.config();

const dialect = process.env.BD_DIALECT || "mysql";
export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "postgres" | "mariadb" | "mongodb",
    host: process.env.BD_HOST || "localhost",
    port: process.env.BD_PORT ? parseInt(process.env.BD_PORT) : 3306,
    username: process.env.BD_USERNAME || "root",
    password: process.env.BD_PASSWORD || "123456",
    database: process.env.BD_DATABASE || "nodeapi",
    entities: [],
    subscribers: [],
    synchronize: false,
    logging: true,
    migrations: [__dirname + "/migration/*.js"],
})