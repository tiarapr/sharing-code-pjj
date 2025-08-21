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
    pgm.createTable("departement", {
        id: {
            type: "UUID",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },
        name: {
            type: "VARCHAR(50)",
            unique: true,
            notNull: true
        },
        created_at: {
            type: "TIMESTAMP",
            notNull: true,
            default: pgm.func("current_TIMESTAMP")
        },
        created_by: {
            type: "UUID",
            references: '"user"(id)',
            onUpdate: "CASCADE",
            notNull: false,
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

    pgm.sql(`
        INSERT INTO departement (name)
        VALUES
        ('Departemen Teknik Elektro'),
        ('Departemen Teknik Informatika dan Komputer'),
        ('Departemen Teknik Mekanika dan Energi'),
        ('Departemen Teknologi Multimedia Kreatif'),
        ('Departemen Program Pendidikan Jarak Jauh');
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('departement');
 };
