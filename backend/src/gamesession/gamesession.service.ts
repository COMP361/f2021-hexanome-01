import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { GameSession } from './gamesession.model';

const instance = axios.create({
  baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/api/sessions/',
});

@Injectable()
export class GameSessionService {
  constructor(
    @InjectRepository(GameSession) private sessionRepository: Repository<GameSession>
    ){}

  async getAllSessions():Promise<GameSession[]> {
    return await this.sessionRepository.find({
      launched: false
    });
  }

  async createSession(
    creator: string,
    minSessionPlayers: number,
    maxSessionPlayers: number,
    displayName: string
  ): Promise<GameSession> {
    const session = this.sessionRepository.create();
    session.creator = creator;
    session.minSessionPlayers = minSessionPlayers;
    session.maxSessionPlayers = maxSessionPlayers;
    session.displayName = displayName;

    return await this.sessionRepository.save(session);
  }

  async launchSession(
    session_id: string
  ): Promise<GameSession> {
    const session = await this.sessionRepository.findOne({
      session_id: session_id
    });

    session.launched = true;

    return await this.sessionRepository.save(session);
  }

  async getSession(
    session_id: string
  ): Promise<GameSession> {
    const session = await this.sessionRepository.findOne({
      session_id: session_id
    })

    return session;
  }


  // async getAllSessions(): Promise<string> {
  //   return instance.get('').then((response) => {
  //     return JSON.stringify(response.data['sessions']);
  //   });
  // }

  // async createSession(
  //   access_token: string,
  //   creator: string,
  //   game: string,
  //   savegame?: string,
  // ): Promise<string> {
  //   let data = null;

  //   data = {
  //     creator: creator,
  //     game: game,
  //   };

  //   if (savegame) {
  //     data.savegame = savegame;
  //   }

  //   return instance
  //     .post(
  //       encodeURI(`?access_token=${access_token}`).replace(/\+/g, '%2B'),
  //       data,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     )
  //     .then((response) => {
  //       return response as unknown as string;
  //     });
  // }

  // async getSession(session_id: string): Promise<GameSession> {
  //   return await instance.get(session_id).then((response) => {
  //     const gameSession: GameSession = new GameSession();
  //     gameSession.creator = response.data['creator'];
  //     gameSession.gameParameters = response.data['creator'] as GSDetail;
  //     gameSession.launched = response.data['launched'];
  //     gameSession.players = response.data['players'];
  //     gameSession.savegameid = response.data['savegameid'];

  //     return gameSession;
  //   });
  // }

  // async joinSession(
  //   session_id: string,
  //   name: string,
  //   access_token: string,
  // ): Promise<string> {
  //   return instance
  //     .put(
  //       encodeURI(
  //         `${session_id}/players/${name}?access_token=${access_token}`,
  //       ).replace(/\+/g, '%2B'),
  //     )
  //     .then((response) => {
  //       return response.data as string;
  //     });
  // }

  // async exitSession(
  //   session_id: string,
  //   name: string,
  //   access_token: string,
  // ): Promise<string> {
  //   return instance
  //     .delete(
  //       encodeURI(
  //         `${session_id}/players/${name}?access_token=${access_token}`,
  //       ).replace(/\+/g, '%2B'),
  //     )
  //     .then((response) => {
  //       return response.data as string;
  //     });
  // }
}
