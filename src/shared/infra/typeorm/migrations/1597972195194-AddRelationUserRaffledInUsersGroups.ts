import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddRelationUserRaffledInUsersGroups1597972195194
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users_groups',
      new TableColumn({
        name: 'user_raffled',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users_groups',
      new TableForeignKey({
        name: 'UserRaffledGroup',
        columnNames: ['user_raffled'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_groups', 'UserRaffledGroup');

    await queryRunner.dropColumn('users_groups', 'user_raffled');
  }
}
