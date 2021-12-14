export abstract class JobsService {
    abstract getJobsByKeyword(keyword: string): Promise<any>;
}
