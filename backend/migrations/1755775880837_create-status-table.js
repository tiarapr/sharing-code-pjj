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
    pgm.createTable("status", {
        id: {
            type: "UUID",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },
        kode_status: {
            type: "VARCHAR(20)",
            notNull: true,
            unique: true,
        },
        label: {
            type: "VARCHAR(100)",
            notNull: true,
            unique: true,
        },
        warna: {
            type: "VARCHAR(20)",
            notNull: false
        },
        urutan: {
            type: "INT",
            notNull: true,
            unique: true,
        },
        is_active: {
            type: "BOOLEAN",
            notNull: true,
            default: true,
        }
    });

    // Seed data status
    pgm.sql(`
        INSERT INTO status (kode_status, label, warna, urutan, is_active) VALUES
            ('dijadwalkan', 'dijadwalkan', 'info', 1),
            ('berlangssung', 'Berlangsung', 'primary', 2),
            ('selesai', 'Selesai', 'success', 3),
            ('dibatalkan', 'Dibatalkan', error, 4),
            ('dijadwalkan_ulang', 'Dijadwalkan Ulang', 'warning', 5);
            ('batal_otomatis', 'Batal Otomatis', 'dark', 6);
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("status");
 };
