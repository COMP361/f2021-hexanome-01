import { Module } from '@nestjs/common';
import { GameSessionModule } from 'src/LS/gamesession/gamesession.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [GameSessionModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
