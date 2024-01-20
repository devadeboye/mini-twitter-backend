import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export abstract class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findOneBy(
    query: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T | undefined> {
    return await this.repository.findOneBy(query);
  }

  async findOne(query: FindOneOptions<T>): Promise<T | undefined> {
    return await this.repository.findOne(query);
  }

  async remove(query: FindOptionsWhere<T>): Promise<void> {
    await this.repository.delete(query);
  }

  async removeOrErrorOut(
    query: FindOptionsWhere<T>,
    errorMessage: string = 'record not found!',
  ) {
    const data = await this.repository.delete(query);
    if (data.affected === 0) {
      throw new NotFoundException(errorMessage);
    }
    return { success: true, ...data };
  }

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  /** This automatically create and sve the record */
  createRecord(data: T) {
    return this.repository.save(data);
  }

  /** always round up to the nearest 10 if not specified */
  roundUpValue(value: number, nearest = 10) {
    return Math.round(value * nearest) / nearest;
  }

  generateUUID() {
    return uuidv4();
  }

  convertDateToUTC(d: Date) {
    const date = new Date(d);
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
  }

  convertDateTimeToUTC(d: Date) {
    const date = new Date(d);
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
      ),
    );
  }

  dateFormatter(date: Date) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      weekday: 'short',
      year: 'numeric',
    });
  }
}
