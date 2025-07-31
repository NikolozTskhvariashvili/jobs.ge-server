import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
console.log('accessKeyId:', !!process.env.MY_AWS_ACCESS_KEY_ID);
console.log('secretAccessKey:', !!process.env.MY_AWS_SECRET_ACCESS_KEY);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
