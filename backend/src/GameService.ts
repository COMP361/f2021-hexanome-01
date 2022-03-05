import axios from 'axios';

export default class GameService {
  private token = '';
  private instance = axios.create({
    baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/',
  });

  private async getOAuthToken(): Promise<void> {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic YmdwLWNsaWVudC1uYW1lOmJncC1jbGllbnQtcHc=',
      },
    };
    await this.instance
      .post(
        encodeURI(
          'oauth/token?grant_type=password&username=Elfenroad&password=f2021-EFRD',
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
    await this.instance
      .get(encodeURI('api/gameservices/Elfenroad'))
      .then(() => {
        return;
      })
      .catch(async () => {
        const data = {
          location: 'http://elfenroads.westus3.cloudapp.azure.com:3454/',
          maxSessionPlayers: 6,
          minSessionPlayers: 2,
          name: 'Elfenroad',
          displayName: 'Elfenroad',
          webSupport: 'true',
        };

        await this.getOAuthToken();

        await this.instance
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
      });
  }
}
