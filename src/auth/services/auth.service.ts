import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return new Promise((resolve) => {
      bcrypt.hash(password, 10, (err: Error, hash: string) => {
        if (err) throw new BadRequestException(err.message);
        resolve(hash);
      });
    });
  }

  async verifyPassword(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(rawPassword, hashedPassword);
    } catch (e: unknown) {
      const err = e as Error;
      throw new BadRequestException(err.message);
    }
  }
}
