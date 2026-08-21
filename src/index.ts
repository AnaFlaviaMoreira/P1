import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Bem vindo!!!aaaaaaaaa');
});

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080: http://localhost:8080');
});


