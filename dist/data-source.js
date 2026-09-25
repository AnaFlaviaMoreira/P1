"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dialect = process.env.BD_DIALECT || "mysql";
exports.AppDataSource = new typeorm_1.DataSource({
    type: dialect,
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
});
