import { Field, ObjectType } from '@nestjs/graphql';
import { Bid } from 'src/bid/bid.model';
import { GameSession } from 'src/gamesession/gamesession.model';
import { OwnableUnit } from 'src/ownableunit/ownableunit.model';
import { Town } from 'src/town/town.model';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@ObjectType()
export class LSUser {
  @Field()
  name: string;

  @Field()
  preferredColour: string;

  @Field()
  role: string;
}

@ObjectType()
@Entity()
export class GameUser {
  @Field()
  @PrimaryColumn()
  name: string;

  @Field(() => GameSession)
  @PrimaryColumn()
  session_id: string;

  @Field()
  @Column()
  coins: number;

  @Field()
  @Column()
  color: string;

  @Field(() => [Town])
  @ManyToMany(() => Town, (town) => town.visitedUsers)
  visitedTowns: Town[];

  @Field(() => Town)
  @ManyToOne(() => Town, (town) => town.currentPlayers)
  currentTown: Town;

  @Field(() => [OwnableUnit])
  @OneToMany(() => OwnableUnit, (unit) => unit.user)
  ownableUnits: OwnableUnit[];

  @Field(() => [Bid])
  @ManyToMany(() => Bid, (bid) => bid.players)
  bids: Bid[];
}
