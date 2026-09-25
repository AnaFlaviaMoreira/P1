import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersTable1790291407231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "situation_id",
                    type: "int",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));

        // Criar chaves estrangeiras
        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["situation_id"],
            referencedTableName: "situations",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover chaves estrangeiras
        const table = await queryRunner.getTable("users");
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("situation_id") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("users", foreignKey);
        }

        // Remover a tabela
        await queryRunner.dropTable("users");
    }

}
