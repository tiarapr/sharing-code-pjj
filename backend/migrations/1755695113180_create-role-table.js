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
    pgm.createTable("role", {
        id: {
            type: "UUID",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },
        name: {
            type: "VARCHAR(50)",
            notNull: true,
            unique: true,
        },
    });

    pgm.sql(`
        INSERT INTO role (name) VALUES
        ('master'),
        ('kemahasiswaan'),
        ('admin'),
        ('konselor'),
        ('mahasiswa');
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => { 
    pgm.dropTable("role");
};
