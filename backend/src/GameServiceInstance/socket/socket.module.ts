import { Module } from '@nestjs/common';
import { GameModule } from 'src/LS/game/gamesvc.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [GameModule],
  providers: [SocketGateway],
})
export class SocketModule {}
