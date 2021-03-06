import axios from 'axios';

export default class GameService {
  private token = '';
  private instance = axios.create({
    baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/',
  });

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

    await this.instance
      .post(
        'oauth/token?grant_type=password&username=maex&password=abc123_ABC123',
        {},
        config,
      )
      .then((response) => {
        access_token = response.data['access_token'];
      })
      .catch((error) => {
        return error.response['data'] as string;
      });

    return await this.instance
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

  private async createLSUsers(): Promise<void> {
    await this.createLSUser(
      'Elfenland-base',
      'f2021-EFLDV2',
      'FFFFFF',
      'ROLE_SERVICE',
    ).catch(() => {
      return;
    });

    await this.createLSUser(
      'Elfenland-4rounds',
      'f2021-EFLDV2',
      'FFFFFF',
      'ROLE_SERVICE',
    ).catch(() => {
      return;
    });
    await this.createLSUser(
      'Elfenland-destination',
      'f2021-EFLDV2',
      'FFFFFF',
      'ROLE_SERVICE',
    ).catch(() => {
      return;
    });
    await this.createLSUser(
      'Elfengold-base',
      'f2021-EFLDV2',
      'FFFFFF',
      'ROLE_SERVICE',
    ).catch(() => {
      return;
    });
    await this.createLSUser(
      'Elfengold-witch',
      'f2021-EFLDV2',
      'FFFFFF',
      'ROLE_SERVICE',
    ).catch(() => {
      return;
    });

    await this.createLSUser(
      'Elfengold-destination',
      'f2021-EFLDV2',
      'FFFFFF',
      'ROLE_SERVICE',
    ).catch(() => {
      return;
    });

    await this.createLSUser(
      'Elfengold-random',
      'f2021-EFLDV2',
      'FFFFFF',
      'ROLE_SERVICE',
    ).catch(() => {
      return;
    });
  }

  private async getOAuthToken(
    username: string,
    password: string,
  ): Promise<void> {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic YmdwLWNsaWVudC1uYW1lOmJncC1jbGllbnQtcHc=',
      },
    };
    await this.instance
      .post(
        encodeURI(
          `oauth/token?grant_type=password&username=${username}&password=${password}`,
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

  private async deleteGameService(
    service: string,
    username: string,
    password: string,
  ): Promise<void> {
    await this.getOAuthToken(username, password);
    await this.instance
      .delete(
        encodeURI(
          `api/gameservices/${service}?access_token=${this.token}`,
        ).replace(/\+/g, '%2B'),
      )
      .catch((error) => {
        return error.response['data'] as string;
      });
  }

  private async registerGameService(
    service: string,
    username: string,
    password: string,
  ): Promise<void> {
    await this.instance
      .get(encodeURI(`api/gameservices/${service}`))
      .then(() => {
        return;
      })
      .catch(async () => {
        const data = {
          location: 'http://elfenroads.westus3.cloudapp.azure.com:3454/',
          maxSessionPlayers: 6,
          minSessionPlayers: 2,
          name: service,
          displayName: service,
          webSupport: 'false',
        };

        await this.getOAuthToken(username, password);

        await this.instance
          .put(
            encodeURI(
              `api/gameservices/${service}?access_token=${this.token}`,
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

  async registerGameServices(): Promise<void> {
    await this.createLSUsers();

    await this.deleteGameService(
      'Elfenland-base',
      'Elfenland-base',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });

    await this.deleteGameService(
      'Elfenland-4rounds',
      'Elfenland-4rounds',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });
    await this.deleteGameService(
      'Elfenland-destination',
      'Elfenland-destination',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });
    await this.deleteGameService(
      'Elfengold-base',
      'Elfengold-base',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });
    await this.deleteGameService(
      'Elfengold-witch',
      'Elfengold-witch',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });

    await this.deleteGameService(
      'Elfengold-destination',
      'Elfengold-destination',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });

    await this.deleteGameService(
      'Elfengold-random',
      'Elfengold-random',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });

    await this.registerGameService(
      'Elfenland-base',
      'Elfenland-base',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });

    await this.registerGameService(
      'Elfenland-4rounds',
      'Elfenland-4rounds',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });
    await this.registerGameService(
      'Elfenland-destination',
      'Elfenland-destination',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });
    await this.registerGameService(
      'Elfengold-base',
      'Elfengold-base',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });
    await this.registerGameService(
      'Elfengold-witch',
      'Elfengold-witch',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });

    await this.registerGameService(
      'Elfengold-destination',
      'Elfengold-destination',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });

    await this.registerGameService(
      'Elfengold-random',
      'Elfengold-random',
      'f2021-EFLDV2',
    ).catch(() => {
      return;
    });
  }
}
