import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async bulkUpdateHasProblems(): Promise<number> {
    // Count the number of users with hasProblems = true
    const count = await this.repository.count({ where: { hasProblems: true } });

    // Set hasProblems to false for all users
    await this.repository.update({}, { hasProblems: false });

    return count;
  }
}
