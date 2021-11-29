import { Field, ObjectType } from '@nestjs/graphql';
import { GameSession } from 'src/gamesession/gamesession.model';
import {
  GoldPiece,
  MagicSpell,
  Obstacle,
  TransporationCounter,
} from 'src/ownableunit/ownableunit.model';
import { GameUser } from 'src/user/user.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

export enum EdgeType {
  PLAIN = 'plain',
  WOOD = 'wood',
  DESERT = 'desert',
  MOUNTAIN = 'mountain',
  RIVER = 'river',
  LAKE = 'lake',
}

@ObjectType()
@Entity()
export class Town {
  @Field(() => GameSession)
  @PrimaryColumn()
  session_id: string;

  @Field()
  @PrimaryColumn()
  name: string;

  @Field()
  @Column()
  gold: number;

  @Field(() => [String])
  townPieces: string[];

  @Field(() => [GameUser])
  @OneToMany(() => GameUser, (gameuser) => gameuser.currentTown)
  currentPlayers: GameUser[];

  @Field(() => [Edge])
  @OneToMany(() => Edge, (edge) => edge.town)
  Edges: Edge[];
}

@ObjectType()
@Entity()
export class Edge {
  @Field()
  @ManyToOne(() => Town, (town) => town.Edges, { primary: true })
  town: Town;

  @Field()
  @Column()
  edgeType: EdgeType;

  @Field(() => [MagicSpell])
  @OneToMany(() => MagicSpell, (magicspell) => magicspell.edge)
  spells: MagicSpell[];

  @Field(() => [TransporationCounter])
  @OneToOne(
    () => TransporationCounter,
    (transporationCounter) => transporationCounter.edge,
  )
  @JoinColumn()
  counter: TransporationCounter;

  @Field(() => [GoldPiece])
  @OneToOne(() => GoldPiece, (goldPiece) => goldPiece.edge)
  @JoinColumn()
  goldPiece: GoldPiece;

  @Field(() => [Obstacle])
  @OneToOne(() => Obstacle, (obstacle) => obstacle.edge)
  @JoinColumn()
  obstacle: Obstacle;
}
