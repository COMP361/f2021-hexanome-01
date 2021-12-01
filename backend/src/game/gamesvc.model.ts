import { Field, ObjectType } from '@nestjs/graphql';
import { OwnableUnit } from 'src/ownableunit/ownableunit.model';
import { Town } from 'src/town/town.model';
import { GameUser } from 'src/user/user.model';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum GamePhase {
  ReadyToJoin = "ReadyToJoin",
  Rounds = "Rounds",
  Completed = "Completed"
}

@ObjectType()
export class GS {
  @Field()
  name: string;

  @Field()
  displayname: string;
}

@ObjectType()
export class GSDetail {
  @Field()
  name: string;

  @Field()
  displayname: string;

  @Field()
  location: string;

  @Field()
  maxSessionPlayers: string;

  @Field()
  minSessionPlayers: string;

  @Field()
  webSupport: boolean;
}

@ObjectType()
export class SaveGame {
  @Field()
  game: GSDetail;

  @Field()
  players: string;

  @Field()
  savegameid: string;
}
