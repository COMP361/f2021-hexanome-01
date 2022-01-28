// import { Field, ObjectType } from '@nestjs/graphql';
// import { ItemUnit } from 'src/ownableunit/ownableunit.model';
// import { GameUser } from 'src/user/user.model';
// import {
//   Column,
//   Entity,
//   JoinColumn,
//   JoinTable,
//   ManyToMany,
//   OneToOne,
// } from 'typeorm';

// @ObjectType()
// @Entity()
// export class Bid {
//   @Field(() => ItemUnit)
//   @OneToOne(() => ItemUnit, (item) => item.bid, {
//     primary: true,
//     cascade: true,
//   })
//   @JoinColumn({ name: 'item_id' })
//   item: ItemUnit;

//   @Field()
//   @Column()
//   bidAmount: number;

//   @Field(() => GameUser)
//   @ManyToMany(() => GameUser, (user) => user.bids, {
//     primary: true,
//     cascade: true,
//   })
//   @JoinTable()
//   players: GameUser[];
// }
