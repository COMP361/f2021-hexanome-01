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
export class GameInstance {
  @Field()
  @PrimaryColumn()
  name: string;

  @Field(() => [GameUser])
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

  @Field(() => GameUser)
  @OneToOne(() => GameUser)
  @JoinColumn()
  startingPlayer: GameUser;

  @Field(() => [OwnableUnit])
  @OneToMany(() => OwnableUnit, ownableunit => ownableunit.game)
  ownableUnits: OwnableUnit[];

  @Field(() => [Town])
  @OneToMany(() => Town, town => town.gameInstance)
  towns: Town[];
}