const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: 'passcode',
  database: 'ridemyway',
});
client.connect();

export default client;
