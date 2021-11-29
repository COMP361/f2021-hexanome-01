import {Module} from '@nestjs/common';
import {UserModule} from 'src/user/user.module';

import {AuthResolver} from './auth.resolver';
import {AuthService} from './auth.service';

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {
}
