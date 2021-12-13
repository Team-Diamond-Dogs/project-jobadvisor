import { Module } from '@nestjs/common';
import { GetOnBoardService } from 'src/services/getonboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from 'src/controllers/jobs.controller';
import { DDogsCourseService } from 'src/services/ddogs-course.service';
import { CourseService } from 'src/services/interfaces/course-service.interface';
import { JobsService } from 'src/services/interfaces/jobs-service.interface';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [JobsController],
  providers: [
    DDogsCourseService,
    {
    provide: 'JOBS_SERVICE',
    inject: [HttpService, ConfigService],
    useFactory: (httpService: HttpService, config: ConfigService) =>
      new GetOnBoardService(
        config.get<string>('JOBS_SERVICE_URL'),
        httpService,
      ),
    },
    {
      provide: CourseService,
      useClass: DDogsCourseService,
    },
    {
      provide: JobsService,
      useClass: GetOnBoardService,
    }
  ],
  exports: ['JOBS_SERVICE'],
})
export class AppModule {}
