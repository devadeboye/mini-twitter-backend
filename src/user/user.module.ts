import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
