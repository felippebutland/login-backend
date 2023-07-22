import { AuthService } from '@auth/service/auth.service';
import { Controller, Post, Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req: Request) {
    return this.authService.login(req.body as unknown as LoginDto);
  }

  @Post('recover-password')
  async sendRecoverPasswordEmail(email: string): Promise<void> {
    return this.authService.recoverPassword(email);
  }
}
