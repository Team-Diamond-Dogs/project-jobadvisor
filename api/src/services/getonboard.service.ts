import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { JobsService } from './interfaces/jobs-service.interface';
import { countTagNamesFromJobs } from './utils';

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
        .get(`${this.endpointUrl}/tags`, {
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
          .map((value: string) => value.trim())
          .filter((value: any) => value);
        filter.push(...filterElement);
      }
    });
    return filter;
  }
  async getSeniorities(): Promise<any> {
    return this.httpService
      .get(`${this.endpointUrl}seniorities`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data.data));
  }
  async getModalities(): Promise<any> {
    return this.httpService
      .get(`${this.endpointUrl}/modalities`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data.data));
  }

  async getJobsByKeyword(keyword: string): Promise<any> {
    const endpointComplete = `${this.endpointUrl}/search/jobs?query=${keyword}&expand=["tags"]`;
    let page = 1;
    const jobsList = [];
    while (true) {
      const jobsResponse = await lastValueFrom(
        this.httpService
          .get(`${endpointComplete}&page=${page}`)
          .pipe(map((response) => response.data)),
      );
      jobsList.push(...jobsResponse.data);
      if (jobsResponse.data.length < 100) {
        break;
      }

      page++;
    }
    return jobsList;
  }

  
}
