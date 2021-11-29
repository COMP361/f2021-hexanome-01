import { Field, ObjectType } from "@nestjs/graphql";
import { ItemUnit } from "src/ownableunit/ownableunit.model";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Bid {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field(() => ItemUnit)
    @OneToOne(() => ItemUnit, item => item.bid)
    item: ItemUnit;

    @Field()
    @Column()
    bidAmount: number
}