import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateGiftTable1597801273712
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'gifts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_user',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'gift_1',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'gift_2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'gift_3',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'giftUser',
            columnNames: ['id_user'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gifts');
  }
}
