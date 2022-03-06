import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GSDetail } from 'src/LS/game/gamesvc.model';
import { LSUser } from 'src/LS/user/user.model';
import { UserService } from 'src/LS/user/user.service';
import { GameSession, SessionInfo } from './gamesession.model';

const instance = axios.create({
  baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/api/sessions/',
});

@Injectable()
export class GameSessionService {
  private sessionPlayers: Map<string, LSUser[]>;
  private userService: UserService;
  constructor() {
    this.sessionPlayers = new Map();
    this.userService = new UserService();
  }

  async getAllSessions(): Promise<GameSession[]> {
    return instance.get('').then((response) => {
      const result: GameSession[] = [];

      for (const key of Object.keys(response.data['sessions'])) {
        const value = response.data['sessions'][key];
        const gameSession: GameSession = new GameSession();
        gameSession.sessionid = key;
        gameSession.creator = value.creator;
        gameSession.gameParameters = value.gameParameters;
        gameSession.launched = value.launched;
        gameSession.players = value.players;
        gameSession.savegameid = value.savegameid;
        result.push(gameSession);
      }
      return result;
    });
  }

  async getSession(session_id: string): Promise<SessionInfo> {
    const sessionInfo = new SessionInfo();
    sessionInfo.gameSession = await instance
      .get(session_id)
      .then((response) => {
        const gameSession: GameSession = new GameSession();
        gameSession.sessionid = session_id;
        gameSession.creator = response.data['creator'];
        gameSession.gameParameters = response.data[
          'gameParameters'
        ] as GSDetail;
        gameSession.launched = response.data['launched'];
        gameSession.players = response.data['players'];
        gameSession.savegameid = response.data['savegameid'];

        return gameSession;
      });

    sessionInfo.users = this.sessionPlayers.get(session_id);

    return sessionInfo;
  }

  async createSession(
    access_token: string,
    creator: string,
    game: string,
    savegame?: string,
  ): Promise<SessionInfo> {
    let data = null;

    data = {
      creator: creator,
      game: game,
      savegame: '',
    };

    if (savegame) {
      data.savegame = savegame;
    }

    const session_id = await instance
      .post(
        encodeURI(`?access_token=${access_token}`).replace(/\+/g, '%2B'),
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        return response.data as string;
      });

    this.userService.getLSUser(access_token);

    return this.getSession(session_id);
  }

  async launchSession(
    session_id: string,
    access_token: string,
  ): Promise<string> {
    return await instance
      .post(
        encodeURI(`${session_id}?access_token=${access_token}`).replace(
          /\+/g,
          '%2B',
        ),
      )
      .then((response) => {
        return response.data as string;
      });
  }

  async joinSession(
    session_id: string,
    name: string,
    access_token: string,
  ): Promise<SessionInfo> {
    return await instance
      .put(
        encodeURI(
          `${session_id}/players/${name}?access_token=${access_token}`,
        ).replace(/\+/g, '%2B'),
      )
      .then(() => {
        return this.getSession(session_id);
      });
  }

  async exitSession(
    session_id: string,
    name: string,
    access_token: string,
  ): Promise<string> {
    return instance
      .delete(
        encodeURI(
          `${session_id}/players/${name}?access_token=${access_token}`,
        ).replace(/\+/g, '%2B'),
      )
      .then((response) => {
        return response.data as string;
      });
  }
}
