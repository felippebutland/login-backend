import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import generateCode from 'src/utils/generateCodes.util';
import { UserValidator } from 'src/validators/user.validator';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userValidator: UserValidator,
    private readonly email: EmailService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    this.userValidator.validateOnCreate(createUserDto);

    const userExists = await this.userRepository.getUser({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new HttpException('User already exists', 409);
    }

    const verificationToken = generateCode(5);

    await this.email.sendEmail(
      'Código de verificação',
      createUserDto.email,
      verificationToken,
    );

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    delete createUserDto.password;

    await this.userRepository.createUser(
      {
        ...createUserDto,
        verified: false,
        password: hashPassword,
      },
      verificationToken,
    );
  }

  async updateStatus(token: string, email: string): Promise<void> {
    const userNotVerified = await this.userRepository.getUser({
      email,
    });

    if (!userNotVerified) {
      throw new HttpException('User not found', 404);
    }

    if (userNotVerified.verified === true) {
      return;
    }

    if (userNotVerified.verifyToken === token) {
      await this.userRepository.updateUser(
        { verified: true },
        userNotVerified.id,
      );
    }
  }

  updateUser(params: Partial<UserDto>) {
    return this.userRepository.updateUserByEmail(params);
  }

  getUser(params?: Partial<UserDto>) {
    return this.userRepository.getUser(params);
  }

  async recoverToken(params: {
    recoverToken: string;
    email: string;
    newPassword: string;
  }) {
    const user = await this.userRepository.getUser({
      email: params.email,
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (user.recoverPassword !== params.recoverToken) {
      return;
    }

    const hashPassword = await bcrypt.hash(params.newPassword, 10);

    await this.userRepository.updateUser({ password: hashPassword }, user.id);
  }
}
