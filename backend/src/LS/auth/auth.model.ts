import { Field, ObjectType } from '@nestjs/graphql';
import { LSUser } from 'src/LS/user/user.model';

@ObjectType()
export class AuthInfo {
  @Field()
  access_token: string;

  @Field()
  token_type: string;

  @Field()
  refresh_token: string;

  @Field()
  expires_in: number;

  @Field()
  scope: string;

  @Field()
  lsUser: LSUser;
}
