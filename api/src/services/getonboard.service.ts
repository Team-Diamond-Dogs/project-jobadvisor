import { HttpService } from "@nestjs/axios";
import { JobsService } from "./interfaces/jobs-service.interface";
import { lastValueFrom, map } from 'rxjs';
import { countTagNamesFromJobs } from "./utils";

export class GetOnBoardService implements JobsService {
    constructor(private readonly endpointUrl: string, private readonly httpService: HttpService) {
    }

    async getJobsByKeyword(keyword: string): Promise<any> {
        const endpointComplete = `${this.endpointUrl}/jobs?query=${keyword}&expand=["tags"]`;
        let page = 1;
        const jobsList = [];
        while (true) {
            const jobsResponse = await lastValueFrom(this.httpService.get(`${endpointComplete}&page=${page}`)
                            .pipe(map(response => response.data)));
            jobsList.push(...jobsResponse.data);
            if(jobsResponse.data.length < 100) {
                break;
            } 

            page++;
        }
        return {
            jobs_count: jobsList.length,
            tags_ranking: countTagNamesFromJobs(jobsList)
        }
    }
}
