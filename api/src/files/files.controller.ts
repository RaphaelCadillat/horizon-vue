import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { uploadConfig } from '../config';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../users/user.schema';
import type { CreateCourseDocDto } from './dto/create-course-doc.dto';
import type { CreateUploadDto } from './dto/create-file.dto';
import type { CourseDoc } from './schemas/course-doc.schema';
import { CourseDocsService } from './services/course-docs.service';
import { FilesService } from './services/files.service';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'files', version: '1' })
export class FilesController {
  constructor(private readonly courseDocService: CourseDocsService, private readonly filesService: FilesService) {}

  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: uploadConfig.maxSize } }))
  @Post('/course-docs/upload')
  public async uploadCourseDocument(@CurrentUser() user: User,
  @Body() body: Partial<CreateCourseDocDto & CreateUploadDto>,
  @UploadedFile() file: Express.Multer.File): Promise<CourseDoc> {
    if (!file)
      throw new BadRequestException('No file has been provided.');

    const fileDocument = await this.filesService.create(user, {
      originalName: file.originalname,
      fileSize: file.size,
      type: file.mimetype,
      encoding: file.encoding,
      lastModified: body?.lastModified ?? new Date(),
    }, file);
    return await this.courseDocService.create(user, body as CreateCourseDocDto, fileDocument);
  }
}