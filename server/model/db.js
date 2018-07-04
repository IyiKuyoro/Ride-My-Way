import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.HEROKU_POSTGRESQL_WHITE_URL,
  ssl: true,
});
client.connect();

export default client;
