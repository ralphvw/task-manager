import pgp from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();
const pg = pgp();

// eslint-disable-next-line no-undef
const DB_URL = process.env.DB_URL;

export const db = pg(DB_URL || '');
