import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Situations } from '../entity/Situations';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Bem vindo! Tela de situações de rota');
});

router.post('/', async (req: Request, res: Response) => {
    try{
        var data = req.body;

        const situationRepository = AppDataSource.getRepository(Situations);

        const newSituation = situationRepository.create(data);

        await situationRepository.save(newSituation);

        res.status(201).json({
            message: 'Situação cadastrada com sucesso!',
            situation: newSituation
        });
    }catch(error){
        res.status(500).json({ message: 'Erro ao cadastrar situação.' });

    }
});

export default router;
