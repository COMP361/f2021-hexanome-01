import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "elfenroads.westus3.cloudapp.azure.com",
      port: 5432,
      username: "comp361",
      password: "elfenroad",
      database: "elfenroad",
      entities: [
        "dist/**/*.model.js"
      ],
      synchronize: false
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
