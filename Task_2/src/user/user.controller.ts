import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('resolve-problems')
  async resolveProblems() {
    const result = await this.userService.resolveUserProblems();
    return { message: 'User problems resolved', ...result };
  }
}
