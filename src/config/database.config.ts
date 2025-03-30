import { registerAs } from '@nestjs/config'

export default registerAs('db', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: process.env.DB_SYNC === 'true',
}))
