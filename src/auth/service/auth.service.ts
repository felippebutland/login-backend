import { EmailService } from '@email/email.service';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/service/user.service';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(password: string, email: string) {
    const user = await this.userService.getUser({ email });

    if (!user) return null;

    if (!user.verified) {
      throw new NotAcceptableException('user not verified');
    }

    const passwordValid = await bcrypt.compare(password, password);

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }

    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: { email: string; password: string }) {
    const payload = { username: user.email };

    const userInDb = await this.userService.getUser({ email: user.email });

    if (userInDb && !userInDb.verified) {
      await this.emailService.sendEmail(
        'Por favor, valide seu e-mail',
        user.email,
        userInDb.verifyToken,
      );

      throw new NotAcceptableException('user not verified, verify your email');
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async recoverPassword(email: string) {
    const user = await this.userService.getUser({ email });

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    const recoverToken = randomBytes(32).toString('hex');

    await this.userService.updateUser({
      email: user.email,
      recoverPassword: recoverToken,
    });

    await this.emailService.sendEmail(
      'Seu e-mail de recuperação de senha',
      email,
      recoverToken,
    );
  }
}
