import { NestFactory } from '@nestjs/core';
import GameService from './GameService';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const gameService = new GameService();
  await gameService.registerGameServices();
  await app.listen(3000);
}

bootstrap();
