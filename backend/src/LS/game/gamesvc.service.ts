import { Injectable } from '@nestjs/common';
import { GameHistory, GSDetail, SaveGame } from './gamesvc.model';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const instance = axios.create({
  baseURL:
    'http://elfenroads.westus3.cloudapp.azure.com:4242/api/gameservices/',
});
@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameHistory)
    private gameHistoryRepo: Repository<GameHistory>,
  ) {}

  async getGameServiceDetail(game: string): Promise<GSDetail> {
    return instance.get(game).then((response) => {
      return response.data as GSDetail;
    });
  }

  async getSaveGames(game: string): Promise<SaveGame[]> {
    return instance.get(game + '/savegames/').then((response) => {
      return response.data as SaveGame[];
    });
  }

  async getSaveGame(game: string, savegameid: string): Promise<SaveGame> {
    return instance.get(game + `/savegames/${savegameid}`).then((response) => {
      return response.data as SaveGame;
    });
  }

  async registerSaveGame(
    game: String,
    savegameid: String,
    players: String[],
    gamedata: String,
  ): Promise<String> {
    let access_token = '';

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic YmdwLWNsaWVudC1uYW1lOmJncC1jbGllbnQtcHc=',
      },
    };

    await axios.create()
      .post(
        'http://elfenroads.westus3.cloudapp.azure.com:4242/oauth/token?grant_type=password&username=maex&password=abc123_ABC123',
        {},
        config,
      )
      .then((response) => {
        access_token = response.data['access_token'];
      }).catch((err) => {
        console.log(err);
      });

    return instance
      .put(encodeURI(savegameid + '?' + access_token), {
        gamename: game,
        players: players,
        savegameid: savegameid,
      })
      .then(async () => {
        const gameHistory = new GameHistory();
        gameHistory.gameid = game + '-' + savegameid;
        gameHistory.gamedata = gamedata;
        await this.gameHistoryRepo.save(gameHistory);
        return 'succeed';
      })
      .catch((error) => {
        return error;
      });
  }

  async deleteSaveGame(game: string, savegameid: string): Promise<string> {
    let access_token = '';

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic YmdwLWNsaWVudC1uYW1lOmJncC1jbGllbnQtcHc=',
      },
    };

    await axios
      .post(
        'http://elfenroads.westus3.cloudapp.azure.com:4242/oauth/token?grant_type=password&username=maex&password=abc123_ABC123',
        {},
        config,
      )
      .then((response) => {
        access_token = response.data['access_token'];
      });

    return instance
      .delete(encodeURI(savegameid + '?' + access_token))
      .then(async () => {
        await this.gameHistoryRepo.delete({
          gameid: game + '-' + savegameid,
        });
        return 'succeed';
      })
      .catch((error) => {
        return error;
      });
  }

  async getSaveGameData(game: string, savegameid: string) {
    return this.gameHistoryRepo.findOne({
      gameid: game + '-' + savegameid,
    });
  }
}
