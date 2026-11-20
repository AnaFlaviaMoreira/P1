import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Situations } from '../entity/Situations';
import { PaginationServices } from '../services/PaginationServices';
import * as yup from 'yup';
import { Not } from 'typeorm';

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

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const result = await PaginationServices.paginate(situationRepository, page, limit, { id: "DESC" });

        res.status(200).json(result);

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
        const schema = yup.object().shape({
            nameSituation: yup.string().required('O campo nameSituation é obrigatório.')
            .min(3, 'O campo nameSituation deve ter no mínimo 3 caracteres.'),
        });
        await schema.validate(data, { abortEarly: false });
        const situationRepository = AppDataSource.getRepository(Situations);

        const existingSituation = await situationRepository.findOne({ 
            where: { nameSituation: data.nameSituation }
         });

        if (existingSituation) {
            res.status(400).json({ message: 'Já existe uma situação com esse nome.' });
            return;
        }

        const newSituation = situationRepository.create(req.body);

        await situationRepository.save(newSituation);

        res.status(201).json({
            message: 'Situação cadastrada com sucesso!',
            situation: newSituation
        });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({ message: error.errors });
            return;
        }

        res.status(500).json({ message: 'Erro ao cadastrar situação.' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        var data = req.body;

        const schema = yup.object().shape({
        nameSituation: yup.string().required('O campo nameSituation é obrigatório.')
        .min(3, 'O campo nameSituation deve ter no mínimo 3 caracteres.'),
        });
        await schema.validate(data, { abortEarly: false });

        const situationRepository = AppDataSource.getRepository(Situations);
        const situations = await situationRepository.findOneBy({ id: Number(id) });
        if (!situations) {
            res.status(404).json({ message: 'Situação não encontrada.' });
            return;
        }
        
        const existingSituation = await situationRepository.findOne({
            where: { nameSituation: data.nameSituation, id: Not(Number(id)) }
        });

        if (existingSituation) {
            res.status(400).json({ message: 'Já existe uma situação com esse nome.' });
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

        if (error instanceof yup.ValidationError) {
            res.status(400).json({ message: error.errors });
            return;
        }
        
        res.status(500).json({ message: 'Erro ao atualizar situações.' });
        
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
