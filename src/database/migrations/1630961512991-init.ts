import {MigrationInterface, QueryRunner} from "typeorm";

export class init1630961512991 implements MigrationInterface {
    name = 'init1630961512991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(255), "email" character varying NOT NULL, "password" character varying(128) NOT NULL, "rol" character varying NOT NULL DEFAULT 'profesor', "profesorId" integer, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "REL_6234164791e27ec6b78657073b" UNIQUE ("profesorId"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profesores" ("id" SERIAL NOT NULL, "nombre" character varying(128) NOT NULL, "apellidos" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "grado_seccion" character varying NOT NULL, "dni" integer NOT NULL, "telefono" integer NOT NULL, CONSTRAINT "UQ_ba99ac38c7abafa4c01542a14de" UNIQUE ("email"), CONSTRAINT "PK_f9adeec6e0091d84e590711c517" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asistencia" ("id" SERIAL NOT NULL, "horaSalida" TIMESTAMP WITH TIME ZONE, "horaEntrada" TIMESTAMP WITH TIME ZONE, "fecha" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'Mon, 06 Sep 2021 20:51:54 GMT', "asistio" boolean NOT NULL DEFAULT false, "description" character varying, "description_salida" text, "profesorId" integer, CONSTRAINT "PK_2402857e8fb33d6c0fe23724b54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "descriptcion" character varying NOT NULL, "image" character varying NOT NULL, "titulo" character varying NOT NULL, "fecha" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'Mon, 06 Sep 2021 20:51:54 GMT', CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solicitud" ("id" SERIAL NOT NULL, "nombre" character varying(64) NOT NULL, "apellidos" character varying(128) NOT NULL, "dni" integer NOT NULL, "email" character varying(255) NOT NULL, "descriptcion" text NOT NULL, "tramite_nombre" character varying NOT NULL DEFAULT 'notas', "telefono" character varying NOT NULL, "archivo" character varying, "fecha" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tramite_estado" character varying NOT NULL DEFAULT 'pendiente', "archivoDescargar" character varying, "visto" boolean NOT NULL DEFAULT false, "descripcion_recepcionista" text, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_511b9da509891c4d75633b5079c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "padres" ("id" SERIAL NOT NULL, "nombre" character varying(128) NOT NULL, "apellido_paterno" character varying(128) NOT NULL, "apellido_materno" character varying(128) NOT NULL, "direccion" character varying(128) NOT NULL, "lugar_donde_vive" character varying(128) NOT NULL, CONSTRAINT "PK_af178f690d2dc54bf9b89a08b76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_6234164791e27ec6b78657073b1" FOREIGN KEY ("profesorId") REFERENCES "profesores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asistencia" ADD CONSTRAINT "FK_e07e8ff95640aa71fba40cd348a" FOREIGN KEY ("profesorId") REFERENCES "profesores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asistencia" DROP CONSTRAINT "FK_e07e8ff95640aa71fba40cd348a"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_6234164791e27ec6b78657073b1"`);
        await queryRunner.query(`DROP TABLE "padres"`);
        await queryRunner.query(`DROP TABLE "solicitud"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "asistencia"`);
        await queryRunner.query(`DROP TABLE "profesores"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
