import express from 'express';
import dotenv from 'dotenv';

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

app.use('/', AuthController);
app.use('/situations', SituationsController);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});


