import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddRelationGroupInUsersGroups1597972029469
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users_groups',
      new TableColumn({
        name: 'id_group',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users_groups',
      new TableForeignKey({
        name: 'GroupsUsers',
        columnNames: ['id_group'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_groups', 'GroupsUsers');

    await queryRunner.dropColumn('users_groups', 'id_group');
  }
}
