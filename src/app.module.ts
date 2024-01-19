import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environmentValidator } from './config/env.validator';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentEnum } from './config/enums/config.enum';

import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: environmentValidator,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),

    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(EnvironmentEnum.TYPEORM_HOST),
        port: +configService.get(EnvironmentEnum.TYPEORM_PORT), // Ensure port is a number
        username: configService.get(EnvironmentEnum.TYPEORM_USERNAME),
        password: configService.get(EnvironmentEnum.TYPEORM_PASSWORD),
        database: configService.get(EnvironmentEnum.TYPEORM_DATABASE),
        entities: [User],
        synchronize: configService.get(EnvironmentEnum.TYPEORM_SYNCHRONIZE),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    UserModule,
    AuthModule,
    TweetModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
