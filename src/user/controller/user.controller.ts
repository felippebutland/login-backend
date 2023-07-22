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
  async updateStatus(@Body() token: string, @Body() email: string) {
    return this.userService.updateStatus(token, email);
  }
}
