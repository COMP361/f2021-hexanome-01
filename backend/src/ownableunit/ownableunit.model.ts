import { Field, ObjectType } from "@nestjs/graphql";
import { Bid } from "src/bid/bid.model";
import { GameInstance } from "src/gs/gs.model";
import { Edge } from "src/town/town.model";
import { GameUser } from "src/user/user.model";
import { ChildEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

export enum SpellType {
    DOUBLE = "Double",
    EXCHANGE = "Exchance"
}

export enum CounterType {
    GIANTPIG = "Giant pig",
    ELFCYCLE = "Elfcycle",
    MAGICCLOUD = "Magic cloud",
    UNICORN = "Unicorn",
    TROLLWAGON = "Troll wagon",
    DRAGON = "Dragon"
}

export enum ObstacleType {
    SEAMONSTER = "Sea Monster",
    TREE = "Tree"
}

export enum TravelCardType {
    GIANTPIG = "Giant pig",
    ELFCYCLE = "Elfcycle",
    MAGICCLOUD = "Magic cloud",
    UNICORN = "Unicorn",
    TROLLWAGON = "Troll wagon",
    DRAGON = "Dragon",
    RAFTS = "Rafts"
}
@ObjectType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })export abstract class OwnableUnit {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => GameInstance)
    @ManyToOne(() => GameInstance, game => game.ownableUnits)
    game: GameInstance;

    @Field(() => [GameUser])
    @ManyToOne(() => GameUser, user => user.ownableUnits)
    user: GameUser[];

}

@ObjectType()
@ChildEntity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class ItemUnit extends OwnableUnit {
    @Field(() => Bid)
    @OneToOne(() => Bid, bid => bid.item)
    bid: Bid
}

@ObjectType()
@ChildEntity()
export class MagicSpell extends ItemUnit {
    @Field()
    @Column()
    spellType: SpellType;

    @Field()
    @ManyToOne(() => Edge, edge => edge.spells)
    edge: Edge;
}

@ObjectType()
@ChildEntity()
export class TransporationCounter extends ItemUnit {
    @Field()
    @Column()
    counterType: CounterType;

    @Field()
    @OneToOne(() => Edge, edge => edge.counter)
    edge: Edge;

}

@ObjectType()
@ChildEntity()
export class GoldPiece extends ItemUnit {
    @Field()
    @Column()
    amount: number;

    @Field()
    @OneToOne(() => Edge, edge => edge.goldPiece)
    edge: Edge;
}

@ObjectType()
@ChildEntity()
export class Obstacle extends ItemUnit {
    @Field()
    @Column()
    obstacleType: ObstacleType;
    @Field()
    @OneToOne(() => Edge, edge => edge.obstacle)
    edge: Edge;
}

@ObjectType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class CardUnit extends OwnableUnit {

}

@ObjectType()
@ChildEntity()
export class MagicSpellCard extends CardUnit {
    @Field()
    @Column()
    spellType: SpellType;
}

@ObjectType()
@ChildEntity()
export class TravelCard extends CardUnit {
    @Field()
    @Column()
    counterType: TravelCardType;
}

@ObjectType()
@ChildEntity()
export class GoldCard extends CardUnit {
    @Field()
    @Column()
    amount: number;
}

@ObjectType()
@ChildEntity()
export class TownCard extends CardUnit {
    @Field()
    @Column()
    name: String;
}