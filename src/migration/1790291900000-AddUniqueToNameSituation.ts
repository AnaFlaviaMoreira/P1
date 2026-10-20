import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class AddUniqueToNameSituation1790291900000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const situationsTable = await queryRunner.getTable("situations");

        // Só cria o índice se a coluna ainda não for única (bancos antigos já podem ter)
        const alreadyUnique = situationsTable?.indices.some(index =>
            index.isUnique &&
            index.columnNames.length === 1 &&
            index.columnNames[0] === "nameSituation"
        );

        if (!alreadyUnique) {
            await queryRunner.createIndex("situations", new TableIndex({
                name: "UQ_situations_nameSituation",
                columnNames: ["nameSituation"],
                isUnique: true
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const situationsTable = await queryRunner.getTable("situations");

        const uniqueIndex = situationsTable?.indices.find(index =>
            index.isUnique &&
            index.columnNames.length === 1 &&
            index.columnNames[0] === "nameSituation"
        );

        if (uniqueIndex) {
            await queryRunner.dropIndex("situations", uniqueIndex);
        }
    }

}
