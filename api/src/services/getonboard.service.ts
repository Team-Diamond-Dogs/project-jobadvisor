import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { JobsService } from './interfaces/jobs-service.interface';

export class GetOnBoardService implements JobsService {
  constructor(
    private readonly endpointUrl: string,
    private readonly httpService: HttpService,
  ) {}

  async getJobs(): Promise<any> {}
  async getCategories(): Promise<any> {}
  async getTags(): Promise<any> {
    const response = await lastValueFrom(
      this.httpService
        .get('https://www.getonbrd.com/api/v0/tags', {
          headers: {
            Accept: 'application/json',
          },
        })
        .pipe(map((response) => response.data.data)),
    );
    const filter = [];
    response.forEach((element) => {
      if (element.attributes.keywords !== '' && element.attributes.keywords) {
        const filterElement = element.attributes.keywords
          .split(',')
          .map((value) => value.trim())
          .filter((value) => value);
        filter.push(...filterElement);
      }
    });
    return filter;
  }
  async getSeniorities(): Promise<any> {
    return this.httpService
      .get('https://www.getonbrd.com/api/v0/seniorities', {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data.data));
  }
  async getModalities(): Promise<any> {
    return this.httpService
      .get('https://www.getonbrd.com/api/v0/modalities', {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data.data));
  }
}
