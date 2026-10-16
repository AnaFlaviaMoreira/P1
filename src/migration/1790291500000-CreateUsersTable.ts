import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersTable1790291500000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (!(await queryRunner.hasTable("users"))) {
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
        }

        const usersTable = await queryRunner.getTable("users");
        const hasSituationForeignKey = usersTable?.foreignKeys.some(foreignKey =>
            foreignKey.columnNames.includes("situation_id") &&
            foreignKey.referencedTableName === "situations"
        );

        if (!hasSituationForeignKey) {
            await queryRunner.createForeignKey("users", new TableForeignKey({
                columnNames: ["situation_id"],
                referencedTableName: "situations",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const legacyMigration = await queryRunner.query(
            "SELECT id FROM migrations WHERE name = ? LIMIT 1",
            ["CreateUsersTable1790291407231"]
        );

        if (legacyMigration.length > 0) {
            return;
        }

        const usersTable = await queryRunner.getTable("users");
        const situationForeignKey = usersTable?.foreignKeys.find(foreignKey =>
            foreignKey.columnNames.includes("situation_id") &&
            foreignKey.referencedTableName === "situations"
        );

        if (situationForeignKey) {
            await queryRunner.dropForeignKey("users", situationForeignKey);
        }

        if (usersTable) {
            await queryRunner.dropTable("users");
        }
    }
}