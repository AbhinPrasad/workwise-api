import { registerAs } from '@nestjs/config'

export default registerAs('db', () => ({
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: process.env.DB_SYNC === 'true',
  autoLoadEntities: process.env.AUTO_LOAD_ENTITIES === 'true',
  logging: process.env.NODE_ENV === 'development',
}))
