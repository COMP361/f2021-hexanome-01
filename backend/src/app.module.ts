/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './LS/auth/auth.module';
import { GameSessionModule } from './LS/gamesession/gamesession.module';
import { GameModule } from './LS/game/gamesvc.module';
import { UserModule } from './LS/user/user.module';
import { SocketModule } from './GameServiceInstance/socket/socket.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameHistory } from './LS/game/gamesvc.model';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '20.38.171.218',
      port: 3456,
      username: 'comp361',
      password: 'comp3612021',
      database: 'cs361',
      entities: [GameHistory],
      synchronize: true,
    }),
    AuthModule,
    GameModule,
    UserModule,
    GameSessionModule,
    SocketModule
  ],
  providers: [AppService, AppResolver],
  controllers: [AppController]
})
export class AppModule {}
