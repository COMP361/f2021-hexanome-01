import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';
import GameService from './GameService'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const gameService = new GameService();
  await gameService.registerGameService();
  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
