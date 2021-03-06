import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

import { DB_TABLE_REFRESH_TOKEN, DB_TABLE_USER } from '@utils';

export class RefreshToken1629959489269 implements MigrationInterface {
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_REFRESH_TOKEN);
  }

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_REFRESH_TOKEN,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'jti',
            type: 'varchar',
          },
          {
            name: 'isRevoked',
            type: 'bool',
            default: false,
          },
          {
            name: 'ip',
            type: 'cidr',
            isNullable: true,
          },
          {
            name: 'os',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'browser',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'userAgent',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'expiredAt',
            type: 'timestamptz',
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      DB_TABLE_REFRESH_TOKEN,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: DB_TABLE_USER,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndices(DB_TABLE_REFRESH_TOKEN, [
      new TableIndex({
        columnNames: ['jti'],
      }),
      new TableIndex({
        columnNames: ['userId'],
      }),
    ]);
  }
}
