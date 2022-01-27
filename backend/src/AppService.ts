import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/',
});

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AppService implements OnApplicationShutdown {
  async onApplicationShutdown(signal?: string) {
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
    await instance
      .delete(
        encodeURI(
          `api/gameservices/Elfenroad?access_token=${access_token}`,
        ).replace(/\+/g, '%2B'),
      )
      .then(() => {
        console.log('Unregister Elfenroad at Lobby Service');
      })
      .catch((error) => {
        console.log(error.data as string);
      });

      console.log("Unregister Hook finished");
  }
}
