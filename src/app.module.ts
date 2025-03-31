import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import dbConfig from './config/db.config'
import appConfig from './config/app.config'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, dbConfig],
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
