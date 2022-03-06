import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GSDetail {
  @Field()
  name: string;

  @Field()
  displayName: string;

  @Field()
  location: string;

  @Field()
  maxSessionPlayers: number;

  @Field()
  minSessionPlayers: number;

  @Field()
  webSupport: boolean;
}
