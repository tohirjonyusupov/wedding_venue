const { Pool } = require('pg');
require('dotenv').config();

// Postgres ma'lumotlari
const pool = new Pool({
  user: "postgres", // Foydalanuvchi nomi
  host: "localhost",
  database: "wedding_venue", // Database nomi
  password: "2004", // Parolingiz
  port: 5432, // Port
});

module.exports = pool;