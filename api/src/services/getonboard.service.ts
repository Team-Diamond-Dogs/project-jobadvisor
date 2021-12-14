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

  async getJobsByKeyword(keyword: string): Promise<any> {
    const endpointComplete = `${this.endpointUrl}/jobs?query=${keyword}&expand=["tags"]`;
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
    return {
      jobs_count: jobsList.length,
      tags_ranking: countTagNamesFromJobs(jobsList),
    };
  }
}
