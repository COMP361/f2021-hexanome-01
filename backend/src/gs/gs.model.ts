import { Field, ObjectType } from '@nestjs/graphql';
import { OwnableUnit } from 'src/ownableunit/ownableunit.model';
import { Town } from 'src/town/town.model';
import { GameUser } from 'src/user/user.model';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

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


@ObjectType()
@Entity()
export class Game {
  @Field()
  @PrimaryColumn()
  name: string;

  @Field()
  @OneToMany(() => GameUser, gameUser => gameUser.game)
  players: GameUser[]

  @Field()
  @Column()
  lobbyName: string;

  @Field()
  @Column()
  currentPhase: GamePhase;

  @Field()
  @Column()
  numOfPlayers: number;

  @Field()
  @OneToOne(() => GameUser)
  @JoinColumn()
  startingPlayer: GameUser;

  @Field()
  @OneToMany(() => OwnableUnit, ownableunit => ownableunit.game)
  ownableUnits: OwnableUnit[];

  @Field()
  @OneToMany(() => Town, town => town.game)
  towns: Town[];
}