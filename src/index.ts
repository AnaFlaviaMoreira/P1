import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

import AuthController from './controllers/AuthController';

app.use('/', AuthController);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});


