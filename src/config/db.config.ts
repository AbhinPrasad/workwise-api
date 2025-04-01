import { registerAs } from '@nestjs/config'

import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsBoolean,
} from 'class-validator'
import validateConfig from '../common/utils/validate-config'
import { DatabaseConfig } from './db-config.type'

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.DATABASE_URL)
  @IsString()
  DATABASE_URL: string

  @IsString()
  DB_HOST: string

  @IsInt()
  @Min(0)
  @Max(65535)
  DB_PORT: number

  @IsString()
  DB_PASS: string

  @IsString()
  DB_NAME: string

  @IsString()
  DB_USER: string

  @IsBoolean()
  @IsOptional()
  DB_SYNC: boolean
}

export default registerAs<DatabaseConfig>('db', () => {
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    type: 'postgres' as const,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '',
    synchronize: process.env.DB_SYNC === 'true',
    autoLoadEntities: true,
    logging: process.env.NODE_ENV === 'development',
  }
})
