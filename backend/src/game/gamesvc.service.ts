import { Injectable } from '@nestjs/common';
import { GS, GSDetail, SaveGame } from './gamesvc.model';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/',
});
@Injectable()
export class GameService {
  constructor() {}

  async getAllGameService(): Promise<GS[]> {
    return instance.get('api/gameservices').then((response) => {
      return response.data as GS[];
    });
  }

  async getGameServiceDetail(name: string): Promise<GSDetail> {
    return instance.get(name).then((response) => {
      return response.data as GSDetail;
    });
  }

  async registerGameService(
    location: string,
    maxSessionPlayers: string,
    minSessionPlayers: string,
    name: string,
    displayname: string,
    webSupport: string,
  ): Promise<string> {
    const data = {
      location: location,
      maxSessionPlayers: maxSessionPlayers,
      minSessionPlayers: minSessionPlayers,
      name: name,
      displayname: displayname,
      webSupport: webSupport,
    };

    let access_token = '';

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic YmdwLWNsaWVudC1uYW1lOmJncC1jbGllbnQtcHc=',
      },
    };

    await instance
      .post(
        'oauth/token?grant_type=password&username=maex&password=abc123_ABC123',
        {},
        config,
      )
      .then((response) => {
        access_token = response.data['access_token'];
      });

    return await instance
      .put(
        encodeURI(
          `api/gameservices/${name}?access_token=${access_token}`,
        ).replace(/\+/g, '%2B'),
        data,
      )
      .then((response) => {
        return response.data as string;
      });
  }

  async deleteGameService(name: string, access_token: string): Promise<string> {
    return await instance
      .delete(
        encodeURI(
          `api/gameservices/${name}?access_token=${access_token}`,
        ).replace(/\+/g, '%2B'),
      )
      .then((response) => {
        return response.data as string;
      });
  }

  async getAllSaveGames(
    name: string,
    access_token: string,
  ): Promise<SaveGame[]> {
    const savegamelist: SaveGame[] = [];
    return await instance
      .get(
        encodeURI(
          `api/gameservices/${name}?access_token=${access_token}`,
        ).replace(/\+/g, '%2B'),
      )
      .then(async (response) => {
        const game = await this.getGameServiceDetail(name);
        response.data.array.forEach((element) => {
          const savegame: SaveGame = new SaveGame();
          savegame.game = game;
          savegame.players = element['players'] as string;
          savegame.savegameid = element['savegameid'];

          savegamelist.push(savegame);
        });
        return savegamelist;
      });
  }

  async getSaveGame(
    name: string,
    savgameid: string,
    access_token: string,
  ): Promise<SaveGame> {
    const game = await this.getGameServiceDetail(name);
    return await instance
      .get(
        encodeURI(
          `api/gameservices/${name}/savegames/${savgameid}?access_token=${access_token}`,
        ).replace(/\+/g, '%2B'),
      )
      .then(async (response) => {
        const savegame: SaveGame = new SaveGame();
        savegame.game = game;
        savegame.players = response.data['players'] as string;
        savegame.savegameid = response.data['savegameid'];

        return savegame;
      });
  }

  async registerSaveGame(
    name: string,
    savegameid: string,
    access_token: string,
    players: string,
  ): Promise<string> {
    const game = await this.getGameServiceDetail(name);
    return await instance
      .put(
        encodeURI(
          `api/gameservices/${name}/savegames/${savegameid}?access_token=${access_token}`,
        ).replace(/\+/g, '%2B'),
        {
          gamename: game,
          players: players,
          savegameid: savegameid,
        },
      )
      .then((response) => {
        return response.data as string;
      });
  }
}
