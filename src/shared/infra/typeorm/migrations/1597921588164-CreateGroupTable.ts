import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateGroupTable1597921588164
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'groups',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_admin',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'date_raffle',
            type: 'timestamp with time zone',
          },
          {
            name: 'date_party',
            type: 'timestamp with time zone',
          },
          {
            name: 'hour_party',
            type: 'timestamp with time zone',
          },
          {
            name: 'locale_party',
            type: 'varchar',
          },
          {
            name: 'value_min',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'status_raffle',
            type: 'boolean',
            isNullable: true,
            default: false,
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
            name: 'groupsUser',
            columnNames: ['user_admin'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('groups');
  }
}
