import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';

dotenv.config();

const app = express();

app.set('json spaces', 2);
app.use(express.json());

// Mostra no terminal cada requisição recebida e o status da resposta
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`>>> ${new Date().toLocaleTimeString()} ${req.method} ${req.originalUrl} -> ${res.statusCode}`);
    });
    next();
});

import AuthController from './controllers/AuthController';
import SituationsController from './controllers/SituationsController';
import ProductSituationsController from './controllers/ProductSituationsController';
import ProductCategoriesController from './controllers/ProductCategoriesController';
import ProductsController from './controllers/ProductsController';

app.use('/', AuthController);
app.use('/situations', SituationsController);
app.use('/product-situations', ProductSituationsController);
app.use('/product-categories', ProductCategoriesController);
app.use('/products', ProductsController);

// Só inicia o servidor depois que a conexão com o banco de dados estiver pronta
AppDataSource.initialize().then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");

    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
    });
}).catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
});


