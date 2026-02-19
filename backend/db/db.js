require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'studio_db',
    password: process.env.DB_Pass,
    port: process.env.SERVER_PORT || 5432
})

module.exports = pool;