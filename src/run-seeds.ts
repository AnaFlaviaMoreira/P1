import { AppDataSource } from "./data-source";
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds";
import CreateProductSituationsSeeds from "./seeds/CreateProductSituationsSeeds";
import CreateProductCategoriesSeeds from "./seeds/CreateProductCategoriesSeeds";
import CreateProductsSeeds from "./seeds/CreateProductsSeeds";

const runSeeds = async () => {
    console.log('Iniciando a execução das seeds...');

    await AppDataSource.initialize();

    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    try {
        const situationsSeeds = new CreateSituationsSeeds();
        await situationsSeeds.run(AppDataSource);

        // A ordem importa: products depende de product_situations e product_categories
        await new CreateProductSituationsSeeds().run(AppDataSource);
        await new CreateProductCategoriesSeeds().run(AppDataSource);
        await new CreateProductsSeeds().run(AppDataSource);
    }
    catch (error) {

        console.error('Erro ao executar as seeds:', error);

    }finally {

        await AppDataSource.destroy();
        console.log('Conexão com o banco de dados encerrada.');
    }
};

runSeeds();



