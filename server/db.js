const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  password: 'dhsrltjr',
  host: 'localhost',
  port: 5432,
  database: 'tango',
})

module.exports = pool
