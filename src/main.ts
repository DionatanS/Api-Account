import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ApiKeyGuard } from './common/guards/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Atendimento')
    .setDescription('Documentação da API de usuários e tickets')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'Chave de acesso da API',
      },
      'x-api-key',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.security = [{ 'x-api-key': [] }];

  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalGuards(new ApiKeyGuard());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
