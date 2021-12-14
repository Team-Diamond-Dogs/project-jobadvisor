import { Controller, Inject } from "@nestjs/common";
import { CourseService } from "src/services/interfaces/course-service.interface";
import { JobsService } from "src/services/interfaces/jobs-service.interface";

@Controller()
export class JobsController {
    constructor(
        @Inject('JOBS_SERVICE') private jobsService: JobsService,
         private readonly coursesService: CourseService) {
        console.log({jobsService, coursesService});
    }
}