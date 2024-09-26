const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

module.exports = new Pool({
    connectionString: process.env.POSTGRESQLCONNSTR_POSTGRESS_URI || process.env.LOCALCONNECT 
})