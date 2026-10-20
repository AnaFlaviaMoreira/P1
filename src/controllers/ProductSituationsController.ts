import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ProductSituations } from '../entity/ProductSituations';
import { PaginationServices } from '../services/PaginationServices';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productSituationRepository = AppDataSource.getRepository(ProductSituations);
        const productSituation = await productSituationRepository.findOneBy({ id: Number(id) });
        if (!productSituation) {
            res.status(404).json({ message: 'Situação do produto não encontrada.' });
            return;
        }

        res.status(200).json(productSituation);
        return;
    }
    catch (error) {
        console.error('Erro ao visualizar situação do produto:', error);
        res.status(500).json({ message: 'Erro ao visualizar situação do produto.' });
        return;
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const productSituationRepository = AppDataSource.getRepository(ProductSituations);

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const result = await PaginationServices.paginate(productSituationRepository, page, limit, { id: "DESC" });

        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error('Erro ao listar situações dos produtos:', error);
        res.status(500).json({ message: 'Erro ao listar situações dos produtos.' });
        return;
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const productSituationRepository = AppDataSource.getRepository(ProductSituations);
        const newProductSituation = productSituationRepository.create(data);

        await productSituationRepository.save(newProductSituation);

        res.status(201).json({
            message: 'Situação do produto cadastrada com sucesso!',
            productSituation: newProductSituation
        });
    } catch (error) {
        console.error('Erro ao cadastrar situação do produto:', error);
        res.status(500).json({ message: 'Erro ao cadastrar situação do produto.' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const data = req.body;

        const productSituationRepository = AppDataSource.getRepository(ProductSituations);
        const productSituation = await productSituationRepository.findOneBy({ id: Number(id) });
        if (!productSituation) {
            res.status(404).json({ message: 'Situação do produto não encontrada.' });
            return;
        }

        productSituationRepository.merge(productSituation, data);
        const updatedProductSituation = await productSituationRepository.save(productSituation);

        res.status(200).json({
            message: 'Situação do produto atualizada com sucesso!',
            productSituation: updatedProductSituation
        });
    }
    catch (error) {
        console.error('Erro ao atualizar situação do produto:', error);
        res.status(500).json({ message: 'Erro ao atualizar situação do produto.' });
        return;
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const productSituationRepository = AppDataSource.getRepository(ProductSituations);
        const productSituation = await productSituationRepository.findOneBy({ id: Number(id) });
        if (!productSituation) {
            res.status(404).json({ message: 'Situação do produto não encontrada.' });
            return;
        }

        await productSituationRepository.remove(productSituation);

        res.status(200).json({
            message: 'Situação do produto removida com sucesso!'
        });
    }
    catch (error) {
        console.error('Erro ao deletar situação do produto:', error);
        res.status(500).json({ message: 'Erro ao deletar situação do produto.' });
        return;
    }
});

export default router;
