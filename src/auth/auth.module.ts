import { Global, Module } from '@nestjs/common';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentEnum } from 'src/config/enums/config.enum';

@Global()
@Module({
  providers: [AuthResolver, AuthService],
  exports: [],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>(EnvironmentEnum.TOKEN_SECRET),
        signOptions: { expiresIn: 15 * 60 }, // 15 minutes
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
