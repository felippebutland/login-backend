import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8000);
  console.log(`Application is running on port: ${process.env.PORT} 🫡`);
}
bootstrap();
