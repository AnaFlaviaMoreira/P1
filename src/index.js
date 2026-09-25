import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import login from './controllers/login';
app.use('/', login);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}: http://localhost:${process.env.PORT || 3000}`);
});
