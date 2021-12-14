import { Controller, Get, Inject, Param } from "@nestjs/common";
import { CourseService } from "src/services/interfaces/course-service.interface";
import { JobsService } from "src/services/interfaces/jobs-service.interface";

@Controller('jobs')
export class JobsController {
    constructor(
        @Inject('JOBS_SERVICE') private jobsService: JobsService,
         private readonly coursesService: CourseService) {
    }

    @Get('/keyword/:keyword')
    async getJobsByKeyword(@Param('keyword') keyword: string): Promise<any> {
        return await this.jobsService.getJobsByKeyword(keyword);
    }
}