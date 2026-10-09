import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Bem vindo! Tela de login de rota');
});

export default router;
