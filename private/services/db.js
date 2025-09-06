const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'userManager',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_NAME || 'appdb'
};

async function getDbConnection() {
  return await mysql.createConnection(dbConfig);
}

module.exports = { getDbConnection };
