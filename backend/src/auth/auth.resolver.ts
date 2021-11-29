import { Inject } from '@nestjs/common';
import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { LSUser } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { AuthInfo } from './auth.model';
import { AuthService } from './auth.service';

@Resolver(() => AuthInfo)
export class AuthResolver {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserService) private lsUserService: UserService,
  ) {}

  @Query(() => AuthInfo)
  async verifyLSUser(
    @Args('grand_type') grand_type: string,
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthInfo> {
    return await this.authService.verifyUser(grand_type, username, password);
  }

  @ResolveField()
  async lsUser(@Parent() authInfo: AuthInfo): Promise<LSUser> {
    const { access_token } = authInfo;
    return await this.lsUserService.getLSUser(access_token);
  }
}