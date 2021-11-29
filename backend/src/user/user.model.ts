import { Field, ObjectType } from '@nestjs/graphql';
import { Bid } from 'src/bid/bid.model';
import { GameSession } from 'src/gamesession/gamesession.model';
import { OwnableUnit } from 'src/ownableunit/ownableunit.model';
import { Town } from 'src/town/town.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Field({defaultValue: 0})
  @Column({default: 0})
  coins: number;

  @Field()
  @Column()
  color: string;

  @Field({defaultValue: 0})
  @Column({default: 0})
  score: number;

  @Field(() => Town, {nullable: true})
  @ManyToOne(() => Town, (town) => town.currentPlayers, {nullable: true})
  currentTown: Town;

  @Field(() => [OwnableUnit], {nullable: true})
  @OneToMany(() => OwnableUnit, (unit) => unit.user, {nullable: true})
  ownableUnits: OwnableUnit[];

  @Field(() => [Bid], {nullable: true})
  @ManyToMany(() => Bid, (bid) => bid.players, {nullable: true})
  bids: Bid[];
}