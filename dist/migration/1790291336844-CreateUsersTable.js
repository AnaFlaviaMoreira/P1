"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1790291336844 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1790291336844 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        await queryRunner.createForeignKey("users", new typeorm_1.TableForeignKey({
            columnNames: ["situation_id"],
            referencedTableName: "situations",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
        }));
    }
    async down(queryRunner) {
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
exports.CreateUsersTable1790291336844 = CreateUsersTable1790291336844;
