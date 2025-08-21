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
    pgm.createType('tipe_konsultasi', ['online', 'offline']);

    pgm.createType('status_janji_temu', [
        'menunggu_konfirmasi',
        'dikonfirmasi',
        'ditolak',
    ]);

    pgm.createTable("janji_temu", {
        id: {
            type: "UUID",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },
        nomor_tiket: {
            type: "VARCHAR(50)",
            notNull: true,
            unique: true,
        },
        nrp: {
            type: "VARCHAR(15)",
            notNull: true,
            references: "mahasiswa(nrp)",
            onUpdate: "CASCADE",
        },
        tipe_konsultasi: {
            type: "tipe_konsultasi",
            notNull: true,
        },
        preferensi_konselor_id: {
            type: "UUID",
            notNull: true,
            references: "konselor_profil(id)",
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        },
        jadwal_utama_tanggal: {
            type: "DATE",
            notNull: true
        },
        jadwal_utama_jam_mulai: {
            type: "TIME",
            notNull: true
        },
        jadwal_utama_jam_selesai: {
            type: "TIME",
            notNull: true
        },
        jadwal_alternatif_tanggal: {
            type: "DATE",
            notNull: true
        },
        jadwal_alternatif_jam_mulai: {
            type: "TIME",
            notNull: true
        },
        jadwal_alternatif_jam_selesai: {
            type: "TIME",
            notNull: true
        },
        tanggal_pengajuan: {
            type: "DATE",
            notNull: true
        },
        status: {
            type: 'status_janji_temu',
            notNull: true,
            default: 'menunggu_konfirmasi'
        },
        status_changed_at: {
            type: "TIMESTAMP"
        },
        status_changed_by: {
            type: 'UUID',
            references: '"user(id)"',
            onUpdate: 'CASCADE'
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

    pgm.createIndex('janji_temu', 'nrp', {
        name: 'idx_janji_temu_nrp'
    });

    pgm.createIndex('janji_temu', 'preferensi_konselor_id', {
        name: 'idx_janji_temu_preferensi_konselor_id'
    });

    pgm.createIndex('janji_temu', 'status', {
        name: 'idx_janji_temu_status'
    });

    pgm.createIndex('janji_temu',
        ['jadwal_utama_tanggal', 'jadwal_utama_jam_mulai', 'jadwal_utama_jam_selesai'], {
        name: 'idx_janji_temu_jadwal_utama'
    });

    pgm.createIndex('janji_temu',
        ['jadwal_alternatif_tanggal', 'jadwal_alternatif_jam_mulai', 'jadwal_alternatif_jam_selesai'], {
        name: 'idx_janji_temu_jadwal_alternatif'
    });

    pgm.createIndex('janji_temu', 'tipe_konsultasi', {
        name: 'idx_janji_temu_tipe_konsultasi'
    })

    pgm.createIndex('janji_temu', 'tanggal_pengajuan', {
        name: 'idx_janji_temu_tanggal_pengajuan'
    })

    pgm.createIndex('janji_temu',
        ['nrp', 'status'], {
            name: 'idx_janji_temu_nrp_status'
        }
    )
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => { 
    pgm.dropIndex('janji_temu', 'nrp', { name: idx_janji_temu_nrp })
    pgm.dropIndex('janji_temu', 'preferensi_konselor_id', { name: idx_janji_temu_preferensi_konselor_id })
    pgm.dropIndex('janji_temu', 'status', { name: idx_janji_temu_status })
    pgm.dropIndex('janji_temu',
        ['jadwal_utama_tanggal', 'jadwal_utama_jam_mulai', 'jadwal_utama_jam_selesai'], {
        name: 'idx_janji_temu_jadwal_utama'
    });

    pgm.dropIndex('janji_temu',
        ['jadwal_alternatif_tanggal', 'jadwal_alternatif_jam_mulai', 'jadwal_alternatif_jam_selesai'], {
        name: 'idx_janji_temu_jadwal_alternatif'
    });

    pgm.dropIndex('janji_temu', 'tipe_konsultasi', {
        name: 'idx_janji_temu_tipe_konsultasi'
    })

    pgm.dropIndex('janji_temu', 'tanggal_pengajuan', {
        name: 'idx_janji_temu_tanggal_pengajuan'
    })

    pgm.dropIndex('janji_temu',
        ['nrp', 'status'], {
            name: 'idx_janji_temu_nrp_status'
        }
    )

    //drop table
    pgm.dropTable('janji_temu');

    // drop type
    pgm.dropType('tipe_konsultasi');
    pgm.dropType('status_janji_temu');
};
