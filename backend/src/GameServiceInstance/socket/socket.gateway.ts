import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from 'src/LS/game/gamesvc.service';
import GameManager from '../manager/GameManager';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  constructor(private readonly gsService: GameService) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(): Promise<string> {
    return 'connected';
  }

  @SubscribeMessage('joinLobby')
  async joinLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() data,
  ): Promise<string> {
    console.log(data);
    client.join(data.game + '-' + data.session_id);
    return 'joined';
  }

  @SubscribeMessage('chat')
  async chat(@MessageBody() data) {
    this.server.to(data.game + '-' + data.session_id).emit('chat', {
      msg: data.msg,
    });
  }

  @SubscribeMessage('startGame')
  async startGame(@MessageBody() data) {
    this.server.to(data.game + '-' + data.session_id).emit('startGame', {
      msg: GameManager.getInstance().getGame(data.game, data.session_id),
      data: this.gsService.getSaveGameData(data.game, data.savegameid),
    });
  }

  @SubscribeMessage('moveBoot')
  async moveBoot(@MessageBody() data) {
    this.server.to(data.game + '-' + data.session_id).emit('moveBoot', {
      msg: data,
    });
  }

  @SubscribeMessage('statusChange')
  async statusChange(@MessageBody() data) {
    this.server.to(data.game + '-' + data.session_id).emit('statusChange', {
      msg: data,
    });
  }

  @SubscribeMessage('declareWinner')
  async declareWinner(@MessageBody() data) {
    this.server.to(data.game + '-' + data.session_id).emit('declareWinner', {
      msg: data,
    });
  }

  @SubscribeMessage('nextRound')
  async nextRound(@MessageBody() data) {
    this.server.to(data.game + '-' + data.session_id).emit('nextRound', {
      msg: data,
    });
  }
}
