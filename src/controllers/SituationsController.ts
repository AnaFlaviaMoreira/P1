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
        res.status(500).json({ message: 'Erro ao visualizar situações.' });
        return;
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {

        const situationRepository = AppDataSource.getRepository(Situations);

        const page = parseInt(req.query.page as string) || 1;

        const limit = 1;

        const totalSituations = await situationRepository.count();

        if (totalSituations === 0) {
            res.status(400).json({ message: 'Nenhuma situação encontrada.' });
            return;
        }

        const lastPage = Math.ceil(totalSituations / limit);

        if (page > lastPage) {
            res.status(400).json({ message: 'Página inválida. O total de páginas é ' + lastPage + '.' });
            return;
        }

        const offset = (page - 1) * limit;



        const situations = await situationRepository.find({
            take: limit,
            skip: offset,
            order: {
                id: 'DESC'
            }


        });

        res.status(200).json({
            currentPage: page,
            lastPage: lastPage,
            totalSituations: totalSituations,
            situations: situations
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao listar situações.' });
        return;
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        var data = req.body;
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

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        var data = req.body;

        const situationRepository = AppDataSource.getRepository(Situations);
        const situations = await situationRepository.findOneBy({ id: Number(id) });
        if (!situations) {
            res.status(404).json({ message: 'Situação não encontrada.' });
            return;
        }

        situationRepository.merge(situations, data);
        const updatedSituation = await situationRepository.save(situations);

        res.status(201).json({
            message: 'Situação atualizada com sucesso!',
            situation: updatedSituation
        });

    }
    catch (error) {
        console.error('Erro ao atualizar situação:', error);
        res.status(500).json({ message: 'Erro ao atualizar situações.' });
        return;
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const situationRepository = AppDataSource.getRepository(Situations);
        const situations = await situationRepository.findOneBy({ id: Number(id) });
        if (!situations) {
            res.status(404).json({ message: 'Situação não encontrada.' });
            return;
        }

        await situationRepository.remove(situations);

        res.status(201).json({
            message: 'Situação removida com sucesso!'
        });

    }
    catch (error) {
        console.error('Erro ao deletar situação:', error);
        res.status(500).json({ message: 'Erro ao deletar situações.' });
        return;
    }
});

export default router;
