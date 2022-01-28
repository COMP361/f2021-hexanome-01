import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://elfenroads.westus3.cloudapp.azure.com:4242/',
});

async function registerGameService(): Promise<string> {
  const data = {
    location: 'http://elfenroads.westus3.cloudapp.azure.com:4243',
    maxSessionPlayers: '6',
    minSessionPlayers: '2',
    name: 'Elfenroad',
    displayname: 'Elfenroad',
    webSupport: 'true',
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
        `api/gameservices/${'Elfenroad'}?access_token=${access_token}`,
      ).replace(/\+/g, '%2B'),
      data,
    )
    .then((response) => {
      return response.data as string;
    });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await registerGameService();
  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
