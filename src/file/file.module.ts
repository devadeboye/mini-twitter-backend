import { Global, Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoredFile } from './entities/stored-file.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([StoredFile])],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
