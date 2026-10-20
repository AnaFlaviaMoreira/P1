import { DataSource } from "typeorm";
import { ProductCategories } from "../entity/ProductCategories";

export default class CreateProductCategoriesSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log('Iniciando a execução das seeds para a tabela "product_categories"...');
        const productCategoryRepository = dataSource.getRepository(ProductCategories);

        const existingProductCategories = await productCategoryRepository.count();

        if (existingProductCategories > 0) {
            console.log('As seeds para a tabela "product_categories" já foram executadas anteriormente. Nenhuma ação será realizada.');
            return;
        }

        const productCategoriesData = [
            { name: 'Eletrônicos' },
            { name: 'Roupas' },
            { name: 'Alimentos' }
        ];

        await productCategoryRepository.save(productCategoriesData);

        console.log('Seeds para a tabela "product_categories" executadas com sucesso!');
    }
}
