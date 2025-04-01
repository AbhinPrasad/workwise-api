import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import dbConfig from './config/db.config'
import appConfig from './config/app.config'
import { DatabaseModule } from './database/database.module'
import { APP_FILTER } from '@nestjs/core'
import { ErrorFilter } from './common/filters/exception.filter'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, dbConfig],
    }),
    DatabaseModule,
    UsersModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: ErrorFilter }],
})
export class AppModule {}
