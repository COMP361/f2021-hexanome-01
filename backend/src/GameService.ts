import axios, { AxiosInstance } from 'axios';

const instance = axios.create({
  baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/',
});

export default class GameService {
  private token: string;
  private instance: AxiosInstance;

  constructor() {
    this.token = '';
    this.instance = axios.create({
      baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/',
    });
  }

  private async getOAuthToken(): Promise<void> {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic YmdwLWNsaWVudC1uYW1lOmJncC1jbGllbnQtcHc=',
      },
    };
    await instance
      .post(
        encodeURI(
          'oauth/token?grant_type=password&username=maex&password=abc123_ABC123',
        ).replace(/\+/g, '%2B'),
        {},
        config,
      )
      .then((response) => {
        this.token = response.data['access_token'];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async registerGameService(): Promise<void> {
    const data = {
      location: 'http://elfenroads.westus3.cloudapp.azure.com:3454/',
      maxSessionPlayers: 6,
      minSessionPlayers: 2,
      name: 'Elfenroad',
      displayName: 'Elfenroad',
      webSupport: 'true',
    };

    await this.getOAuthToken();

    await instance
      .put(
        encodeURI(
          `api/gameservices/Elfenroad?access_token=${this.token}`,
        ).replace(/\+/g, '%2B'),
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((error) => {
        console.log(error);
      });
  }
}
