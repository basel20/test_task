import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async resolveUserProblems(): Promise<{ resolvedCount: number }> {
    const resolvedCount = await this.userRepository.bulkUpdateHasProblems();
    return { resolvedCount };
  }
}
