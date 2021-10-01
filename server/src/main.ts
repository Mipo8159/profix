import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  });

  const PORT = process.env.PORT;
  await app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
}
bootstrap();
