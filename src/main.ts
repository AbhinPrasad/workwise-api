import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import validationOptions from './common/utils/validation-options'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix'))
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.useGlobalPipes(new ValidationPipe(validationOptions))
  app.useGlobalInterceptors(new ResponseInterceptor())
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)
  const port = configService.get<string>('app.port') ?? 8081
  await app.listen(port)
  console.log(`server running on ${await app.getUrl()}`)
}
bootstrap()
