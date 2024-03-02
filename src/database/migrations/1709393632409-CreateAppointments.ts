import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointments1709393632409 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name: 'appointments',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
               },
               {
                name: "user_id",
                type: "int",
                //isPrimary: true,
                isNullable: true
             },
             {
                name: "dog_id",
                type: "int",
                //isPrimary: true,
                isNullable: true
             },
             {
                name: "activity_id",
                type: "int",
                //isPrimary: true,
                isNullable: true
             },
              {
                 name: "date",
                 type: "varchar",
                 length: "255",
                 isNullable: true                    
              },
              {
                name: "hour",
                type: "varchar",
                length: "255",
                isNullable: true
                
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

],
foreignKeys: [
    {
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
       },
       {
        columnNames: ["dog_id"],
        referencedTableName: "dogs",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
       },
       {
        columnNames: ["activity_id"],
        referencedTableName: "activities",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
       },
]
}),
true
        );
}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
    }

}
