import { registerAs } from '@nestjs/config'
import validateConfig from '../common/utils/validate-config'
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator'
import { AppConfig } from './app-config.type'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_URL: string

  @IsString()
  @IsOptional()
  API_PREFIX: string
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
        ? parseInt(process.env.PORT, 10)
        : 8081,
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    apiPrefix: process.env.API_PREFIX || 'workwise',
  }
})
