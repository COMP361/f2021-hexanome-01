import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(@Inject(AppService) private appService: AppService) {}

  @Query(() => String)
  sayHello(): string {
    return this.appService.getHello();
  }

  @Query(() => String)
  async getOnline(): Promise<string> {
    return await this.appService.getOnline();
  }
}
