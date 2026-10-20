import { DataSource } from "typeorm";
import { Situations } from "../entity/Situations";

export default class CreateSituationsSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log('Iniciando a execução das seeds para a tabela "situations"...');
        const situationRepository = dataSource.getRepository(Situations);

        const existingSituations = await situationRepository.count();

        if (existingSituations > 0) {
            console.log('As seeds para a tabela "situations" já foram executadas anteriormente. Nenhuma ação será realizada.');
            return;

        }

        const situationsData = [
            { nameSituation: 'Ativo' },
            { nameSituation: 'Inativo' },
            { nameSituation: 'Pendente' }
        ];

        await situationRepository.save(situationsData);

        console.log('Seeds para a tabela "situations" executadas com sucesso: situação cadastrada com sucesso!');
    }
}