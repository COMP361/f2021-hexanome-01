import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class GS {
  @Field() name: string;

  @Field() displayname: string;
}

@ObjectType()
export class GSDetail {
  @Field() name: string;

  @Field() displayname: string;

  @Field() location: string;

  @Field() maxSessionPlayers: string;

  @Field() minSessionPlayers: string;

  @Field() webSupport: boolean;
}

@ObjectType()
export class SaveGame {
  @Field() game: GSDetail;

  @Field() players: string;

  @Field() savegameid: string;
}
