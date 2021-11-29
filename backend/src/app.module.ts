import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GameSessionModule } from './gamesession/gamesession.module';
import { GameModule } from './game/gamesvc.module';
import { UserModule } from './user/user.module';
import { TownModule } from './town/town.module';

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
      synchronize: false,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    AuthModule,
    GameModule,
    UserModule,
    GameSessionModule,
    TownModule
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
