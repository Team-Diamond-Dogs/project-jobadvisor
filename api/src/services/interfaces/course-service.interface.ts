import { TagCourse } from "src/domain/entities/tag-course.entity";
import { Tag } from "src/domain/entities/tag.entity";

export abstract class CourseService {
    abstract getAllTags(): Promise<Tag[]>;
    abstract getCoursesFromTagNames(tagNames: string[]): Promise<any[]>
}