import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Products } from '../entity/Products';
import { PaginationServices } from '../services/PaginationServices';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productRepository = AppDataSource.getRepository(Products);
        // relations: traz junto a situação e a categoria do produto
        const product = await productRepository.findOne({
            where: { id: Number(id) },
            relations: ['productSituation', 'productCategory']
        });
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado.' });
            return;
        }

        res.status(200).json(product);
        return;
    }
    catch (error) {
        console.error('Erro ao visualizar produto:', error);
        res.status(500).json({ message: 'Erro ao visualizar produto.' });
        return;
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(Products);

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const result = await PaginationServices.paginate(productRepository, page, limit, { id: "DESC" });

        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ message: 'Erro ao listar produtos.' });
        return;
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const productRepository = AppDataSource.getRepository(Products);
        const newProduct = productRepository.create(data);

        await productRepository.save(newProduct);

        res.status(201).json({
            message: 'Produto cadastrado com sucesso!',
            product: newProduct
        });
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        res.status(500).json({ message: 'Erro ao cadastrar produto.' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const data = req.body;

        const productRepository = AppDataSource.getRepository(Products);
        const product = await productRepository.findOneBy({ id: Number(id) });
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado.' });
            return;
        }

        productRepository.merge(product, data);
        const updatedProduct = await productRepository.save(product);

        res.status(200).json({
            message: 'Produto atualizado com sucesso!',
            product: updatedProduct
        });
    }
    catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ message: 'Erro ao atualizar produto.' });
        return;
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const productRepository = AppDataSource.getRepository(Products);
        const product = await productRepository.findOneBy({ id: Number(id) });
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado.' });
            return;
        }

        await productRepository.remove(product);

        res.status(200).json({
            message: 'Produto removido com sucesso!'
        });
    }
    catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ message: 'Erro ao deletar produto.' });
        return;
    }
});

export default router;
