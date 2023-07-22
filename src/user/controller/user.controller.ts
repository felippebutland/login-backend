import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch()
  async updateStatus(@Body() params: { token: string; email: string }) {
    return this.userService.updateStatus(params.token, params.email);
  }

  @Post('recover-password')
  async sendRecoverPasswordEmail(
    @Body()
    params: {
      recoverToken: string;
      email: string;
      newPassword: string;
    },
  ) {
    return this.userService.recoverToken(params);
  }
}
