import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { joinLobbyDto } from "./socket";

@WebSocketGateway(3001, {
    cors: {
        origin: "*",
    }
})
export class SocketGateway {
    constructor() { }
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('joinLobby')
    async joinLobby(
        client: Socket,
        @MessageBody() data: joinLobbyDto
    ): Promise<void> {
            client.join(data.session_id);
            this.server.to(data.session_id).emit('joinLobby', {
                msg: data
            });
    }


    @SubscribeMessage('startGame')
    async startGame(
        @MessageBody() session_id: string
    ) {
            this.server.to(session_id).emit('startGame', {
                msg: 'start'
            });
    }

    @SubscribeMessage('moveBoot')
    async moveBoot(
        @MessageBody() data: any
    ) {
        this.server.to(data.session_id).emit('moveBoot', {
            msg: data
        });
    }

}