import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Só permite campos que estão no DTO
      forbidNonWhitelisted: true, // Dá erro se mandar campos a mais
      transform: true, // Transforma os dados (ex: string -> number)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
