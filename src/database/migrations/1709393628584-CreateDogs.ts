import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDogs1709393628584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "dogs",
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
                        length: "50",
                        isUnique: true,
                    },
                    {
                        name: "race",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
       
                     },
                     {
                        name: "age",
                        type: "int",
                        isNullable: true,
       
                     },
                     {
                        name: "size",
                        type: "varchar",
                        length: "255",
                     },
                     {
                        name: "weight",
                        type: "varchar",
                        length: "255",
                     },
                     {
                        name: "sociable",
                        type: "varchar",
                        length: "255",
                     },
                     {
                        name: "photo",
                        type: "varchar",
                        length: "500",
                        default: "'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'"
                     },
                     {
                        name: "gallery",
                        type: "text",
                        isNullable: true,
                    },
                     {
                        name: "is_active",
                        type: "boolean",
                        default: "true",
                     },
                     {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    },
                    ]
       
            }),
            true
            );
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("dogs");
    }

}
