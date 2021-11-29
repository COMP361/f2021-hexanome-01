import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { GameUser, LSUser } from './user.model';

const instance = axios.create({
  baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/',
});
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(GameUser)
    private userRepository: Repository<GameUser>,
  ) {}

  async getLSUser(access_token: string): Promise<LSUser> {
    return await instance
      .get(
        `oauth/username?access_token=${encodeURI(access_token).replace(
          /\+/g,
          '%2B',
        )}`,
      )
      .then((res) => {
        const name = res.data;

        return instance
          .get(
            encodeURI(`api/users/${name}?access_token=${access_token}`).replace(
              /\+/g,
              '%2B',
            ),
          )
          .then((response) => {
            return response.data as LSUser;
          });
      });
  }

  async createLSUser(
    name: string,
    password: string,
    preferredColour: string,
    role: string,
  ): Promise<string> {
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
        encodeURI(`api/users/${name}?access_token=${access_token}`).replace(
          /\+/g,
          '%2B',
        ),
        {
          name: name,
          password: password,
          preferredColour: preferredColour,
          role: role,
        },
      )
      .then((response) => {
        return response.data as string;
      })
      .catch((error) => {
        return error.response['data'] as string;
      });
  }

  async modifyPreferredColour(
    name: string,
    access_token: string,
    colour: string,
  ): Promise<string> {
    return await instance
      .post(
        encodeURI(
          `api/users/${name}/colour?access_token=${access_token}`,
        ).replace(/\+/g, '%2B'),
        {
          colour: colour,
        },
      )
      .then(() => {
        return 'succeed';
      })
      .catch((error) => {
        return JSON.stringify(error.response);
      });
  }

  async updatePassword(
    user: string,
    access_token: string,
    oldPassowrd: string,
    newPassword: string,
  ) {
    return await instance
      .post(
        encodeURI(`api/users/${user}/access_token=${access_token}`).replace(
          /\+/g,
          '%2B',
        ),
        {
          nextPassword: newPassword,
          oldPassword: oldPassowrd,
        },
      )
      .then(() => {
        return 'succeed';
      })
      .catch((error) => {
        return JSON.stringify(error.response);
      });
  }

  async getGameUser(name: string, session_id: string): Promise<GameUser> {
    return await this.userRepository.findOne({
      name: name,
      session_id: session_id,
    });
  }

  async getAllGameUsers(name: string): Promise<GameUser[]> {
    return await this.userRepository.find({
      name: name,
    });
  }

  async createGameUser(
    name: string,
    session_id: string,
    color: string,
  ): Promise<GameUser> {
    const gameUser: GameUser = new GameUser();
    gameUser.name = name;
    (gameUser.session_id = session_id), (gameUser.color = color);
    return await this.userRepository.save(gameUser);
  }

  async removeGameUser(name: string, session_id: string): Promise<string> {
    return await this.userRepository
      .delete({
        name: name,
        session_id: session_id,
      })
      .then((response) => {
        return response as unknown as string;
      });
  }

}
