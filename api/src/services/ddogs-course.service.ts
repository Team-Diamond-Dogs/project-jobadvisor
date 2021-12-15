import { InjectRepository } from "@nestjs/typeorm";
import { TagCourse } from "src/domain/entities/tag-course.entity";
import { Tag } from "src/domain/entities/tag.entity";
import { In, Repository } from "typeorm";
import { CourseService } from "./interfaces/course-service.interface";

export class DDogsCourseService implements CourseService{
    constructor(
        @InjectRepository(Tag)
        private tagsRepository: Repository<Tag>,
        @InjectRepository(TagCourse)
        private tagCoursesRepository: Repository<TagCourse>,
    ){}

    async getAllTags(): Promise<Tag[]> {
        return this.tagsRepository.find();
    }

    async getAllTagCourses(): Promise<any[]> {
        return this.tagCoursesRepository.find();
    }

    async getCoursesFromTagNames(tagNames: string[]): Promise<any[]> {
        const tags = (await this.tagsRepository.find({
            where: {
                value: In(tagNames),
                is_skill: true,
            },
        }));

        const tagIds = tags.map(tag => tag.id);

        const courses = await this.tagCoursesRepository.find({
            where: {
                tag_id: In(tagIds),
            }
        })

        const tagsWithCourses = courses.map(course => {
            const tag = tags.find(tag => tag.id === course.tag_id);
            return {
                ...course,
                tag_name: tag.name,
            };
        }
        );





        return tagsWithCourses;
    }

}
