import { Controller, Get, Inject } from '@nestjs/common';
import { CourseService } from 'src/services/interfaces/course-service.interface';
import { JobsService } from 'src/services/interfaces/jobs-service.interface';

@Controller()
export class DataController {
  constructor(
    @Inject('JOBS_SERVICE') private jobsService: JobsService,
    private readonly coursesService: CourseService,
  ) {}

  @Get('/seniorities')
  getSeniorities() {
    return this.jobsService.getSeniorities();
  }

  @Get('/modalities')
  getModalities() {
    return this.jobsService.getModalities();
  }

  @Get('/tags')
  getTags() {
    return this.jobsService.getTags();
  }
}
