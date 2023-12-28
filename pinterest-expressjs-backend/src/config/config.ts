import * as dotenv from "dotenv";

dotenv.config();

export default {
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  type: process.env.DB_TYPE,
  listen: process.env.LISTEN_PORT,
};
