import { Field, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/gs/gs.model';
import { OwnableUnit } from 'src/ownableunit/ownableunit.model';
import { Town } from 'src/town/town.model';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @ManyToOne(() => Game, game => game.players)
  game: Game;

  @Field()
  @Column()
  coins: number;

  @Field()
  @Column()
  color: ColorType;

  @Field()
  @Column()
  score : number;

  @Field()
  @ManyToOne(() => Town, town => town.currentPlayers) 
  currentTown: Town;

  @Field()
  @OneToMany(() => OwnableUnit, unit => unit.user)
  ownableUnits: OwnableUnit[]
}

