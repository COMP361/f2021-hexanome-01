import { Module } from '@nestjs/common';
import { GSResolver } from './gs.resolver';
import { GSService } from './gs.service';

@Module({
  providers: [GSService, GSResolver],
  exports: [GSService],
})
export class GameServiceModule {}
