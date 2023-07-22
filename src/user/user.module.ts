import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@schema/user.schema';
import { EmailService } from 'src/email/email.service';
import { UserValidator } from 'src/validators/user.validator';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserValidator, EmailService, UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
