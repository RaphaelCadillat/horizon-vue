import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { config } from './config';
import { ExceptionsFilter } from './shared/filter/exceptions.filter';
import { logger } from './shared/middlewares/logger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());

  app.enableCors();
  app.enableShutdownHooks();
  app.enableVersioning({ type: VersioningType.HEADER, header: 'X-Api-Version' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));
  app.useGlobalFilters(new ExceptionsFilter());
  app.set('trust proxy', false);

  app.use(logger);

  await app.listen(config.get('port'));
  Logger.log(`Server initialized on port ${config.get('port')}`, 'Bootstrap');
}

void bootstrap();
