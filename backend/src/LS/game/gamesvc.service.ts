import { Injectable } from '@nestjs/common';
import { GSDetail } from './gamesvc.model';
import axios from 'axios';

const instance = axios.create({
  baseURL:
    'http://elfenroads.westus3.cloudapp.azure.com:4242/api/gameservices/',
});
@Injectable()
export class GameService {
  constructor() {}

  async getGameServiceDetail(game: string): Promise<GSDetail> {
    return instance.get(game).then((response) => {
      return response.data as GSDetail;
    });
  }
}
