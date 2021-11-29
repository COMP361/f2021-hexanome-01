import { Field, ObjectType } from '@nestjs/graphql';
import { Bid } from 'src/bid/bid.model';
import { GameInstance } from 'src/gs/gs.model';
import { OwnableUnit } from 'src/ownableunit/ownableunit.model';
import { Town } from 'src/town/town.model';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

export enum ColorType {
  Blue = "Blue",
  Yellow = "Yellow",
  Red = "Red",
  Green = "Green",
  Black = "Black",
  Purple = "Purple"
}

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

  @Field()
  @ManyToOne(() => GameInstance, game => game.players, {primary: true})
  game: GameInstance;

  @Field()
  @Column()
  coins: number;

  @Field()
  @Column()
  color: ColorType;

  @Field(() => [Town])
  @ManyToMany(() => Town, town => town.visitedUsers)
  visitedTowns : Town[];

  @Field(() => Town)
  @ManyToOne(() => Town, town => town.currentPlayers) 
  currentTown: Town;

  @Field(() => [OwnableUnit])
  @OneToMany(() => OwnableUnit, unit => unit.user)
  ownableUnits: OwnableUnit[]

  @Field(() => [Bid])
  @ManyToMany(() => Bid, bid => bid.players)
  bids: Bid[]
}

