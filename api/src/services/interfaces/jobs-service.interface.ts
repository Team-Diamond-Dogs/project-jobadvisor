export abstract class JobsService {
  abstract getJobs(): Promise<any>;
  abstract getCategories(): Promise<any>;
  abstract getTags(): Promise<any>;
  abstract getSeniorities(): Promise<any>;
  abstract getModalities(): Promise<any>;
}
