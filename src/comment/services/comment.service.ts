import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/services/base.service';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService extends BaseService<Comment> {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {
    super(commentRepository);
  }
}
