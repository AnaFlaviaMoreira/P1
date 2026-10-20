import { DataSource } from "typeorm";
import { ProductSituations } from "../entity/ProductSituations";

export default class CreateProductSituationsSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log('Iniciando a execução das seeds para a tabela "product_situations"...');
        const productSituationRepository = dataSource.getRepository(ProductSituations);

        const existingProductSituations = await productSituationRepository.count();

        if (existingProductSituations > 0) {
            console.log('As seeds para a tabela "product_situations" já foram executadas anteriormente. Nenhuma ação será realizada.');
            return;
        }

        const productSituationsData = [
            { name: 'Disponível' },
            { name: 'Indisponível' },
            { name: 'Esgotado' }
        ];

        await productSituationRepository.save(productSituationsData);

        console.log('Seeds para a tabela "product_situations" executadas com sucesso!');
    }
}
