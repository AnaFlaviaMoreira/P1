import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"

const dialect = process.env.BD_DIALECT || "mysql";
export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "postgres" | "mariadb" | "mongodb" | "mssql",
    host: process.env.BD_HOST || "localhost",
    port: process.env.BD_PORT ? parseInt(process.env.BD_PORT) : 3306,
    username: process.env.BD_USERNAME || "root",
    password: process.env.BD_PASSWORD || "123456",
    database: process.env.BD_DATABASE || "nodeapi",
    entities: [],
    synchronize: false,
    logging: true,
})