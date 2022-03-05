import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  constructor() {}
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket): Promise<string> {
    return 'connected';
  }

  @SubscribeMessage('joinLobby')
  async joinLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() data,
  ): Promise<void> {
    client.join(data.session_id);
    this.server.to(data.session_id).emit('joinLobby', {
      msg: data,
    });
  }

  @SubscribeMessage('startGame')
  async startGame(@MessageBody() session_id: string) {
    this.server.to(session_id).emit('startGame', {
      msg: 'start',
    });
  }

  @SubscribeMessage('moveBoot')
  async moveBoot(@MessageBody() data: any) {
    this.server.to(data.session_id).emit('moveBoot', {
      msg: data,
    });
  }
}
