import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GameSessionModule } from './gamesession/gamesession.module';
// import { GameModule } from './game/gamesvc.module';
import { UserModule } from './user/user.module';
import { TownModule } from './town/town.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'elfenroads.westus3.cloudapp.azure.com',
      port: 5432,
      username: 'comp361',
      password: 'elfenroad',
      database: 'elfenroad',
      entities: ['dist/**/*.model.js'],
      synchronize: true,
      "migrations": ["dist/migrations/*{.ts,.js}"],
      "migrationsTableName": "migrations_typeorm",
      "migrationsRun": true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    AuthModule,
    // GameModule,
    UserModule,
    GameSessionModule,
    TownModule,
    SocketModule
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
