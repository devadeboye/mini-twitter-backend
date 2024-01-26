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
import { CloudinaryModule } from 'nestjs-cloudinary';
import { FileModule } from './file/file.module';

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
      installSubscriptionHandlers: true,
      // resolvers: { Upload },
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
        migrations: [__dirname + '/src/db/migrations/**/*.ts'],
      }),
      inject: [ConfigService],
    }),

    CloudinaryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        cloud_name: configService.get(EnvironmentEnum.CLOUDINARY_CLOUD_NAME),
        api_key: configService.get(EnvironmentEnum.CLOUDINARY_API_KEY),
        api_secret: configService.get(EnvironmentEnum.CLOUDINARY_API_SECRET),
      }),
      inject: [ConfigService],
    }),

    UserModule,
    AuthModule,
    TweetModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
