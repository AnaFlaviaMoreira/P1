import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Situations } from '../entity/Situations';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const situationRepository = AppDataSource.getRepository(Situations);
        const situations = await situationRepository.findOneBy({ id: Number(id) });
        if (!situations) {
            res.status(404).json({ message: 'Situação não encontrada.' });
            return;
        }

        res.status(200).json(situations);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao listar situações.' });
        return;
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const situationRepository = AppDataSource.getRepository(Situations);
        const situations = await situationRepository.find();

        res.status(200).json(situations);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao listar situações.' });
        return;
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const situationRepository = AppDataSource.getRepository(Situations);
        const newSituation = situationRepository.create(req.body);

        await situationRepository.save(newSituation);

        res.status(201).json({
            message: 'Situação cadastrada com sucesso!',
            situation: newSituation
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar situação.' });
    }
});

export default router;
