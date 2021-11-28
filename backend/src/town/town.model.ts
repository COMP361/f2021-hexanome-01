import { Field, ObjectType } from "@nestjs/graphql";
import { Game } from "src/gs/gs.model";
import { GoldPiece, MagicSpell, Obstacle, TransporationCounter } from "src/ownableunit/ownableunit.model";
import { ColorType, GameUser } from "src/user/user.model";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export enum EdgeType {

}

@ObjectType()
@Entity()
export class Town {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Field()
    @ManyToOne(() => Game, game => game.ownableUnits)
    game: Game;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    gold: number;

    @Field()
    @Column()
    townPieces: ColorType[];

    @Field()
    @OneToMany(() => GameUser, gameuser => gameuser.currentTown)
    currentPlayers: GameUser[];

}

@ObjectType()
@Entity()
export class Edge {
    @Field()
    @PrimaryColumn()
    startTown: Town;

    @Field()
    @PrimaryColumn()
    endTown: Town;

    @Field()
    @Column()
    edgeType: EdgeType;

    @Field()
    @OneToMany(() => MagicSpell, magicspell => magicspell.edge)
    spells: MagicSpell[];

    @Field()
    @OneToOne(() => TransporationCounter, transporationCounter => transporationCounter.edge)
    @JoinColumn()
    counter: TransporationCounter;

    @Field()
    @OneToOne(() => GoldPiece, goldPiece => goldPiece.edge)
    @JoinColumn()
    goldPiece: GoldPiece;

    @Field()
    @OneToOne(() => Obstacle, obstacle => obstacle.edge)
    @JoinColumn()
    obstacle: Obstacle;

}

