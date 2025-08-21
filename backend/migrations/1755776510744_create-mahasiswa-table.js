/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable("mahasiswa", {
        id: {
            type: "UUID",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },
        nrp: {
            type: "VARCHAR(15)",
            notNull: true,
            unique: true,
        },
        nama_lengkap: {
            type: "VARCHAR(250)",
            notNull: true,
        },
        program_studi_id: {
            type: "UUID",
            notNull: true,
            references: "program_studi(id)",
            onUpdate: "CASCADE",
        },
        tanggal_lahir: {
            type: "DATE",
            notNull: true,
        },
        jenis_kelamin: {
            type: "CHAR(1)",
            notNull: true,
        },
        user_id: {
            type: "UUID",
            unique: true,
            notNull: true,
            references: '"user"(id)',
            onUpdate: "CASCADE",
        },
        is_active: {
            type: "BOOLEAN",
            notNull: true,
            default: true,
        },
        created_at: {
            type: "TIMESTAMP",
            notNull: true,
            default: pgm.func("current_TIMESTAMP"),
        },
        created_by: {
            type: "UUID",
            references: '"user"(id)',
            onUpdate: "CASCADE"
        },
        updated_at: {
            type: "TIMESTAMP",
            default: null,
        },
        updated_by: {
            type: "UUID",
            references: '"user"(id)',
            onUpdate: "CASCADE",
        },
        deleted_at: {
            type: "TIMESTAMP",
            default: null,
        },
        deleted_by: {
            type: "UUID",
            references: '"user"(id)',
            onUpdate: "CASCADE",
        },
    });

    pgm.createIndex("mahasiswa", "nama_lengkap", {
        name: "idx_mahasiswa_nama_lengkap",
    });

    pgm.createIndex("mahasiswa", "program_studi_id", {
        name: "idx_mahasiswa_program_studi_id",
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropIndex("mahasiswa", "idx_mahasiswa_nama_lengkap");
    pgm.dropIndex("mahasiswa", "idx_mahasiswa_program_studi_id");
    pgm.dropTable("mahasiswa");
};
