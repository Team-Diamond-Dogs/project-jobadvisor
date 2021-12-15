import { Controller, Get, Inject, Param } from "@nestjs/common";
import { CourseService } from "src/services/interfaces/course-service.interface";
import { JobsService } from "src/services/interfaces/jobs-service.interface";
import { countTagNamesFromJobs } from "src/services/utils";

@Controller('jobs')
export class JobsController {
    constructor(
        @Inject('JOBS_SERVICE') private jobsService: JobsService,
         private readonly coursesService: CourseService) {
    }

    @Get('/keyword/:keyword')
    async getJobsByKeyword(@Param('keyword') keyword: string): Promise<any> {

        const jobsList = await this.jobsService.getJobsByKeyword(keyword);
        const tagsRanking = countTagNamesFromJobs(jobsList);

        const coursesList = await this.coursesService.getCoursesFromTagNames(tagsRanking.map(tag => tag.name));

        const tagsRankingWithCourses = tagsRanking.map(tag => {
            const courses = coursesList.filter(course => course.tag_name.includes(tag.name)).slice(0, 3);
            return {
                ...tag,
                courses
            }
        }).slice(0, 10);

        for(let tag of tagsRankingWithCourses) {
            tag.courses = tag.courses.map(course => {
                return {
                    name: course.name,
                    url: course.url,
                    thumbnail_url: course.thumbnail_url,
                }
            })
        }
        // console.log({joinCoursesWithTagsRanking()});

        return {
            jobs_count: jobsList.length,
            tags_ranking: tagsRankingWithCourses.filter(r => r.courses.length > 0),
          };
    }
}