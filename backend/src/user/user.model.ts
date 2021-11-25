import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LSUser {
  @Field()
  name: string;

  @Field()
  preferredColour: string;

  @Field()
  role: string;
}
