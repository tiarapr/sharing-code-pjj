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
    pgm.createTable('konseling', {
        id: {
            type: "UUID",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },
        janji_temu_id: {
            type: "UUID",
            notNull: true,
            references: "janji_temu(id)",
            onUpdate: "CASCADE"
        },
        tanggal_konseling: {
            type: "DATE",
            notNull: true
        },
        jam_mulai: {
            type: "TIME",
            notNull: true
        },
        jam_selesai: {
            type: "TIME",
            notNull: true
        },
        konselor_profil_id: {
            type: "UUID",
            notNull: false,
            references: "konselor_profil(id)",
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        }, 
        lokasi: {
            type: "VARCHAR(255)",
            notNull: false
        },
        status_id: {
            type: "UUID",
            notNull: true,
            references: "status(id)",
            onUpdate:"CASCADE"
        },
        status_kehadiran: {
            type: 'BOOLEAN',
            notNull: false,
            default: null
        },
        tanggal_konfirmasi: {
            type: 'DATE',
            notNull: false,
            default: null
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
    })

    pgm.createIndex('konseling', 'janji_temu_id', {
        name: 'idx_konseling_janji_temu_id'
    });

    pgm.createIndex('konseling', 'preferensi_konselor_id', {
        name: 'idx_konseling_preferensi_konselor_id'
    });

    pgm.createIndex('konseling', 'tanggal_konseling', {
        name: 'idx_konseling_tanggal_konseling'
    })

    pgm.createIndex('konseling', 
        ['tanggal_konseling', 'jam_mulai', 'jam_selesai'], {
        name: 'idx_konseling_jadwal_lengkap'
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropIndex('konseling', 'janji_temu_id', {
        name: 'idx_konseling_janji_temu_id'
    });

    pgm.dropIndex('konseling', 'preferensi_konselor_id', {
        name: 'idx_konseling_preferensi_konselor_id'
    });

    pgm.dropIndex('konseling', 'tanggal_konseling', {
        name: 'idx_konseling_tanggal_konseling'
    })

    pgm.dropIndex('konseling', 
        ['tanggal_konseling', 'jam_mulai', 'jam_selesai'], {
        name: 'idx_konseling_jadwal_lengkap'
    })

    pgm.dropTable('konseling');
};
