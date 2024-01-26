import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { BaseService } from 'src/utils/services/base.service';
import { Repository } from 'typeorm';
import { StoredFile } from '../entities/stored-file.entity';

@Injectable()
export class FileService extends BaseService<StoredFile> {
  constructor(
    @InjectRepository(StoredFile)
    private fileRepository: Repository<StoredFile>,
  ) {
    super(fileRepository);
  }

  async deleteCloudinaryImages(resource: string[]) {
    cloudinary.api
      .delete_resources(resource, { type: 'upload', resource_type: 'image' })
      .then(console.log);
  }

  async deleteFile(id: string) {
    const file = await this.findOneByOrErrorOut({ id }, 'file not found');

    // delete file on cloudinary
    await this.deleteCloudinaryImages([file.publicId]);

    // delete file in db
    this.remove({ id });
  }
}
