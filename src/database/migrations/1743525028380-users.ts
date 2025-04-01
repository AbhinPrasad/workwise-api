import { MigrationInterface, QueryRunner } from 'typeorm'

export class Users1743525028380 implements MigrationInterface {
  name = 'Users1743525028380'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firebase_uid" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "user_name" character varying, "profile_img_url" character varying, "status" smallint NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" json NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" json NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_0fd54ced5cc75f7cb92925dd803" UNIQUE ("firebase_uid"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_0fd54ced5cc75f7cb92925dd80" ON "users" ("firebase_uid") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0fd54ced5cc75f7cb92925dd80"`,
    )
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
