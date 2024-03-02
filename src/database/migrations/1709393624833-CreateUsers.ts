import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1709393624833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
                        name: "username",
                        type: "varchar",
                        length: "50",
                        isUnique: true,
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
       
                     },
                     {
                        name: "last_name",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
       
                     },
                     {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                     },
                     {
                        name: "password",
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
                        name: "city",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                     },
                     {
                        name: "phone",
                        type: "varchar",
                        length: "16" ,  // phone number has to be in this format +38(099)999-99-99
                        isNullable: true,
                     },
                     {
                        name: "is_partner",
                        type: "boolean",
                        default: false,
                     },
                     {
                        name: "is_volunteer",
                        type: "boolean",
                        default: true,
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
        await queryRunner.dropTable("users");
    }

}
