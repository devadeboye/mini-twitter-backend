import { Global, Module } from '@nestjs/common';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';

@Global()
@Module({ providers: [AuthResolver, AuthService], exports: [] })
export class AuthModule {}
