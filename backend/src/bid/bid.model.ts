import { ObjectType } from "@nestjs/graphql";
import { ItemUnit } from "src/ownableunit/ownableunit.model";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Bid {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => ItemUnit, item => item.bid)
    item: ItemUnit;

    @Column()
    bidAmount: number
}