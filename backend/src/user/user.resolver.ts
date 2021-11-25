import { Inject } from "@nestjs/common";
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { LSUser } from "./user.model";
import { UserService } from "./user.service";

@Resolver(of => LSUser)
export class UserResolver {
    constructor(
        @Inject(UserService) private userService: UserService
    ) {};

    @Query(returns => LSUser)
    async LSUser(
        @Args('access_token') access_token: string,
        ): Promise<LSUser> {
        return await this.userService.getLSUser(access_token);
    }

    @Mutation(returns => String)
    async createLSUser(
        @Args('name') name: string,
        @Args('password') password: string,
        @Args('preferredColour') preferredColour: string,
        @Args('role') role: string
    ): Promise<String> {
        return await this.userService.createLSUser(name, password, preferredColour, role);
    }

    @Mutation(returns => String)
    async modifyLSUserColor(
        @Args('name') name: string,
        @Args('access_token') access_token: string,
        @Args('colour') colour: string
    ) {
        return await this.userService.modifyPreferredColour(name, access_token, colour);
    }

    @Mutation(returns => String)
    async changeLSUserPassword(
        @Args('name') name: string,
        @Args('access_token') access_token: string,
        @Args('oldPassword') oldPassword: string,
        @Args('newPassword') newPassword: string
    ) {
        return await this.userService.updatePassword(name, access_token, oldPassword, newPassword);
    }
}