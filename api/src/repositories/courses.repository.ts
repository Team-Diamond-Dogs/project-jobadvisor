import { Connection } from 'typeorm';

export class CoursesRepository {
    constructor(private readonly connection: Connection) {}

    async getCoursesByKeyword(keyword: string): Promise<any> {}

}