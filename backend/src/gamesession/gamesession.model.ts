import { Field, ObjectType } from '@nestjs/graphql';
import { GSDetail } from 'src/game/gamesvc.model';
import { Town } from 'src/town/town.model';
import { GameUser, LSUser } from 'src/user/user.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class GameSession {
  @Field()
  creator: string;

  @Field(() => [GSDetail])
  gameParameters: GSDetail;

  @Field()
  launched: boolean;

  @Field(() => [LSUser])
  players: LSUser[];

  @Field()
  savegameid: string;
}


// @ObjectType()
// @Entity()
// export class GameSession {
//   @PrimaryGeneratedColumn('uuid')
//   @Field()
//   session_id: string;

//   @Column()
//   @Field()
//   displayName: string;
//   @Column()
//   @Field()
//   creator: string;

//   @Column()
//   @Field({defaultValue: false})
//   launched: boolean;

//   @Field(() => [GameUser], {nullable: true})
//   @OneToMany(() => GameUser, (user) => user.session_id, {nullable: true})
//   players: GameUser[];

//   @Field()
//   @Column()
//   minSessionPlayers: number;

//   @Field()
//   @Column()
//   maxSessionPlayers: number;

//   @Field(() => [Town])
//   @OneToMany(() => Town, town => town.session_id)
//   towns: Town[]



// }