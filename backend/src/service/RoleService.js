const { Pool } = require(pg);

const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class RoleService {
    constructor() {
        this._pool = new Pool({ connectionString: process.env.DATABASE_URL });
    }

    async addRole({ role_name }) {
        const query = {
            text: 'INSERT INTO role (name) VALUES ($1) RETURNING id, name',
            values: [role_name]
        };

        const result = await this._pool.query(query);

        if(!result.rows_length) {
            throw new InvariantError('Failed to add role');
        }

        return result.rows[0];
    }

    async getRole() {
        const query = {
            text: 'SELECT id, name FROM role'
        }

        const result = await this._pool.query(query);

        return result.rows;
    }

    async getRoleById(roleId) {
        const query = {
            text: 'SELECT id, name FROM role WHERE id = $1',
            values: [roleId]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Role not found');
        }

        return result.rows[0];
    }

    async getRoleByName(roleName) {
        const query = {
            text: 'SELECT id, name FROM role WHERE LOWER(name) = LOWER($1)',
            values: [roleName]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Role not found');
        }

        return result.rows[0];
    }

    async updateRole(roleId, { role_name }) {
        if(!role_name || typeof role_name !== 'string') {
            throw new InvariantError('Invalid role name');
        }

        const query = {
            text: 'UPDATE role SET name = $1 WHERE id = $2 RETURNING id, name',
            values: [role_name, roleId]
        };

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Role not found');
        }

        return result.rows[0];
    }

    async deleteRole(roleId) {
        const query = {
            text: 'DELETE FROM role WHERE id = $1 RETURNING *',
            values: [roleId]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Role not found');
        }

        return result.rows[0];
    }
}

module.export = RoleService;