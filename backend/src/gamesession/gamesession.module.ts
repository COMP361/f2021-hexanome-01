import {Module} from '@nestjs/common';

import {GameSessionResolver} from './gamesession.resolver';
import {GameSessionService} from './gamesession.service';

@Module({
  providers: [GameSessionService, GameSessionResolver],
  exports: [GameSessionService],
})
export class GameSessionModule {
}
