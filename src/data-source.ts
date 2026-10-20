import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"
import { Situations } from "./entity/Situations"
import { User } from "./entity/Users"
import { ProductSituations } from "./entity/ProductSituations"
import { ProductCategories } from "./entity/ProductCategories"
import { Products } from "./entity/Products"


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
    entities: [Situations, User, ProductSituations, ProductCategories, Products],
    subscribers: [],
    synchronize: false,
    logging: true,
    migrations: [__dirname + "/migration/*.js"],
});

// A conexão é aberta por quem usa o AppDataSource (index.ts, run-seeds.ts e o CLI do TypeORM).
// Não chamar initialize() aqui, senão a conexão é aberta duas vezes e os comandos não terminam.