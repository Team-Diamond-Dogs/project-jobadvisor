import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { GetOnBoardService } from 'src/services/getonboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from 'src/controllers/jobs.controller';
import { DDogsCourseService } from 'src/services/ddogs-course.service';
import { CourseService } from 'src/services/interfaces/course-service.interface';
import { JobsService } from 'src/services/interfaces/jobs-service.interface';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataController } from 'src/controllers/data.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Tag } from 'src/domain/entities/tag.entity';
import { TagCourse } from 'src/domain/entities/tag-course.entity';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({ isGlobal: true, ttl: 3600 }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Tag, TagCourse]),
  ],
  controllers: [JobsController, DataController],
  providers: [
    // DDogsCourseService,
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
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: CourseService,
      useClass: DDogsCourseService,
    },
    {
      provide: JobsService,
      useClass: GetOnBoardService,
    },
  ],
  exports: ['JOBS_SERVICE'],
})
export class AppModule {}
