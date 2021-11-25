import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getOnline(): Promise<string> {
    return axios
      .get('http://elfenroads.westus3.cloudapp.azure.com:4242/api/online')
      .then((response) => {
        return response.data;
      });
  }
}
