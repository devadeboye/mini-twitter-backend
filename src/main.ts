import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { EnvironmentEnum } from './config/enums/config.enum';
import * as cookieParser from 'cookie-parser';
import { AuthGuard } from './auth/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());

  const reflector = app.get(Reflector);
  // app.useGlobalGuards(new AuthGuard(reflector));

  const configService = app.get(ConfigService);

  const port = configService.get<number>(EnvironmentEnum.PORT);
  Logger.debug(port, 'port number');

  await app.listen(port);
  Logger.debug(`listening on port ${port}`);
}
bootstrap();
