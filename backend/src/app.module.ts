import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConfig from './config/database.config';
import { ConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig() as ConnectionOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
