import { HttpException, Injectable } from '@nestjs/common';
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

    await this.userRepository.createUser(
      {
        ...createUserDto,
        verified: false,
      },
      verificationToken,
    );
  }

  async updateStatus(token: string, email: string): Promise<void> {
    const userNotVerified = await this.userRepository.getUser({
      email: email,
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
}
