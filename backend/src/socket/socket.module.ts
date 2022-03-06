import { Module } from '@nestjs/common';
import { TownModule } from 'src/town/town.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [TownModule],
  providers: [SocketGateway],
})
export class SocketModule {}
