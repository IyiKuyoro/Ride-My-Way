const pg = require('pg');

const config = {
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: 'passcode',
  database: 'ridemyway',
};

const pool = pg.Pool(config);

export default pool;
