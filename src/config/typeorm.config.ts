import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import * as path from 'path'

config()
const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST') as string,
  port: parseInt(configService.get<string>('DB_PORT') as string, 10),
  username: configService.get<string>('DB_USER') as string,
  password: configService.get<string>('DB_PASS') as string,
  database: configService.get<string>('DB_NAME') as string,
  entities: [path.join(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrations: [
    path.join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}'),
  ],
  migrationsTableName: 'migrations_history',
  synchronize: false,
  ssl: configService.get<string>('DB_SSL') === 'true',
})
