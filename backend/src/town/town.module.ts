import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Town } from './town.model';
import { TownResolver } from './town.resolver';
import { TownService } from './town.service';


@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Town])],
  providers: [TownService, TownResolver],
  exports: [TownService, TypeOrmModule],
})
export class TownModule {}
