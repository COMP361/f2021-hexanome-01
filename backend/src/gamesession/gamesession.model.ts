import { Field, ObjectType } from "@nestjs/graphql";
import { GSDetail } from "src/gs/gs.model";
import { LSUser } from "src/user/user.model";

@ObjectType()
export class GameSession {
    @Field()
    creator: string

    @Field()
    gameParameters: GSDetail

    @Field()
    launched: boolean

    @Field(type => [LSUser])
    players: LSUser[]


    @Field()
    savegameid: string
}