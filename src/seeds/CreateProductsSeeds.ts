import { DataSource } from "typeorm";
import { Products } from "../entity/Products";
import { ProductSituations } from "../entity/ProductSituations";
import { ProductCategories } from "../entity/ProductCategories";

export default class CreateProductsSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log('Iniciando a execução das seeds para a tabela "products"...');
        const productRepository = dataSource.getRepository(Products);

        const existingProducts = await productRepository.count();

        if (existingProducts > 0) {
            console.log('As seeds para a tabela "products" já foram executadas anteriormente. Nenhuma ação será realizada.');
            return;
        }

        // Os produtos precisam de uma situação e de uma categoria que já existam no banco
        const productSituation = await dataSource.getRepository(ProductSituations).findOneBy({ name: 'Disponível' });
        const productCategory = await dataSource.getRepository(ProductCategories).findOneBy({ name: 'Eletrônicos' });

        if (!productSituation || !productCategory) {
            console.log('Execute antes as seeds de "product_situations" e "product_categories". Nenhuma ação será realizada.');
            return;
        }

        const productsData = [
            { name: 'Notebook', productSituationId: productSituation.id, productCategoryId: productCategory.id },
            { name: 'Celular', productSituationId: productSituation.id, productCategoryId: productCategory.id },
            { name: 'Fone de ouvido', productSituationId: productSituation.id, productCategoryId: productCategory.id }
        ];

        await productRepository.save(productsData);

        console.log('Seeds para a tabela "products" executadas com sucesso!');
    }
}
