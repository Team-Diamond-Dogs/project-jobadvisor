import { HttpService } from "@nestjs/axios";
import { JobsService } from "./interfaces/jobs-service.interface";

export class GetOnBoardService implements JobsService{
    constructor(private readonly endpointUrl: string, private readonly httpService: HttpService) {
    }

    async getJobs(): Promise<any> {}
    async getCategories(): Promise<any> {}
    async getTags(): Promise<any> {}

}
