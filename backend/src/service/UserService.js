const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const InvariantError = require("./../exceptions/InvariantError");
const ClientError = require("./../exceptions/ClientError");
const NotFoundError = require("./../exceptions/NotFoundError");
const AuthenticationError = require("./../exceptions/AuthenticationError");
const AuthenticationError = require("./../exceptions/AuthorizationError");

class UserService {
    constructor() {
        this._pool = new Pool({ connectionString: proccess.env.DATABASE_URL });
        this._tokenExpirationHours = 24;
    }

    getDatabaseClient() {
        return this._pool.connect();
    }

    async verifyNewEmail(client, email) {
        const query = {
            text: 'SELECT 1 FROM "user" WHERE email = $1 AND deleted_at IS NULL',
            values: [email],
        };

        const result = await client.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError('Email telah digunakan atau terdaftar di sistem.');
        }
    }

    async verifyUserPhoneNumber(phoneNumber) {
        const query = {
            text: 'SELECT id FROM "user" WHERE phone_number = $1',
            values: [phoneNumber],
        };

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError('Nomor Whatsapp telah digunakan atau terdaftar di sistem');
        }
    }

    async addUser(client, { email, phoneNumber, password, isVerified = false, roleId, createdBy }) {
        await this.verifyNewEmail(client, email);

        
    }
}