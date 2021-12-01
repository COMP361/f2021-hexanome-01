import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSessionModule } from 'src/gamesession/gamesession.module';
import { GameUser } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [GameSessionModule, TypeOrmModule.forFeature([GameUser])],
  providers: [UserService, UserResolver],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
