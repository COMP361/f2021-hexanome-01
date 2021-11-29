import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GSDetail } from 'src/game/gamesvc.model';
import { GameSession } from './gamesession.model';

const instance = axios.create({
  baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/api/sessions/',
});

@Injectable()
export class GameSessionService {
  async getAllSessions(): Promise<string> {
    return instance.get('').then((response) => {
      return JSON.stringify(response.data['sessions']);
    });
  }

  async createSession(
    access_token: string,
    creator?: string,
    game?: string,
    savegame?: string,
  ): Promise<string> {
    let data = null;

    if (creator && game && savegame) {
      data = {
        creator: creator,
        game: game,
        savegame: savegame,
      };
    }

    return instance
      .post(
        encodeURI(`?access_token=${access_token}`).replace(/\+/g, '%2B'),
        data,
      )
      .then((response) => {
        return response.data as string;
      });
  }

  async getSession(session_id: string): Promise<GameSession> {
    return await instance.get(session_id).then((response) => {
      const gameSession: GameSession = new GameSession();
      gameSession.creator = response.data['creator'];
      gameSession.gameParameters = response.data['creator'] as GSDetail;
      gameSession.launched = response.data['launched'];
      gameSession.players = response.data['players'];
      gameSession.savegameid = response.data['savegameid'];

      return gameSession;
    });
  }

  async joinSession(
    session_id: string,
    name: string,
    access_token: string,
  ): Promise<string> {
    return instance
      .put(
        encodeURI(
          `${session_id}/players/${name}?access_token=${access_token}`,
        ).replace(/\+/g, '%2B'),
      )
      .then((response) => {
        return response.data as string;
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
