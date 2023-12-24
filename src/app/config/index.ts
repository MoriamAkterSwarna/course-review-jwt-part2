import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

export const config = {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  salt_rounds: process.env.PASSWORD_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRATION,
};
