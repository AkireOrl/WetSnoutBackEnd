import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateActivity1709393630530 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: "activities",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",

                },
                {
                    name: "activity_name",
                    type: "enum",
                    enum: ["walk", "transport", "cleaning"],
                    
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
            ],
        }),
        true
    );
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("activities");
}

}
