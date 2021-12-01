import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AuthInfo } from './authmodel';
const instance = axios.create({
  baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/',
});

@Injectable()
export class AuthService {
  constructor() {}

  async verifyUser(
    grant_type: string,
    username: string,
    password: string,
  ): Promise<AuthInfo> {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic YmdwLWNsaWVudC1uYW1lOmJncC1jbGllbnQtcHc=',
      },
    };
    const authInfo: AuthInfo = new AuthInfo();

    await instance
      .post(
        encodeURI(
          `oauth/token?grant_type=${grant_type}&username=${username}&password=${password}`,
        ).replace(/\+/g, '%2B'),
        {},
        config,
      )
      .then(async (response) => {
        authInfo.access_token = response.data['access_token'];
        authInfo.expires_in = response.data['expires_in'];
        authInfo.refresh_token = response.data['refresh_token'];
        authInfo.scope = response.data['scope'];
        authInfo.token_type = response.data['token_type'];
      });

    return authInfo;
  }
}
