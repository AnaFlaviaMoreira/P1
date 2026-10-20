import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ProductCategories } from '../entity/ProductCategories';
import { PaginationServices } from '../services/PaginationServices';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productCategoryRepository = AppDataSource.getRepository(ProductCategories);
        const productCategory = await productCategoryRepository.findOneBy({ id: Number(id) });
        if (!productCategory) {
            res.status(404).json({ message: 'Categoria do produto não encontrada.' });
            return;
        }

        res.status(200).json(productCategory);
        return;
    }
    catch (error) {
        console.error('Erro ao visualizar categoria do produto:', error);
        res.status(500).json({ message: 'Erro ao visualizar categoria do produto.' });
        return;
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const productCategoryRepository = AppDataSource.getRepository(ProductCategories);

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const result = await PaginationServices.paginate(productCategoryRepository, page, limit, { id: "DESC" });

        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error('Erro ao listar categorias dos produtos:', error);
        res.status(500).json({ message: 'Erro ao listar categorias dos produtos.' });
        return;
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const productCategoryRepository = AppDataSource.getRepository(ProductCategories);
        const newProductCategory = productCategoryRepository.create(data);

        await productCategoryRepository.save(newProductCategory);

        res.status(201).json({
            message: 'Categoria do produto cadastrada com sucesso!',
            productCategory: newProductCategory
        });
    } catch (error) {
        console.error('Erro ao cadastrar categoria do produto:', error);
        res.status(500).json({ message: 'Erro ao cadastrar categoria do produto.' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const data = req.body;

        const productCategoryRepository = AppDataSource.getRepository(ProductCategories);
        const productCategory = await productCategoryRepository.findOneBy({ id: Number(id) });
        if (!productCategory) {
            res.status(404).json({ message: 'Categoria do produto não encontrada.' });
            return;
        }

        productCategoryRepository.merge(productCategory, data);
        const updatedProductCategory = await productCategoryRepository.save(productCategory);

        res.status(200).json({
            message: 'Categoria do produto atualizada com sucesso!',
            productCategory: updatedProductCategory
        });
    }
    catch (error) {
        console.error('Erro ao atualizar categoria do produto:', error);
        res.status(500).json({ message: 'Erro ao atualizar categoria do produto.' });
        return;
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const productCategoryRepository = AppDataSource.getRepository(ProductCategories);
        const productCategory = await productCategoryRepository.findOneBy({ id: Number(id) });
        if (!productCategory) {
            res.status(404).json({ message: 'Categoria do produto não encontrada.' });
            return;
        }

        await productCategoryRepository.remove(productCategory);

        res.status(200).json({
            message: 'Categoria do produto removida com sucesso!'
        });
    }
    catch (error) {
        console.error('Erro ao deletar categoria do produto:', error);
        res.status(500).json({ message: 'Erro ao deletar categoria do produto.' });
        return;
    }
});

export default router;
