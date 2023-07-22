import { EmailModule } from '@email/email.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from '@schema/user.schema';
import { UserService } from '@user/service/user.service';
import { UserModule } from '@user/user.module';
import { ValidatorsModule } from '@validators/validators.module';
import { LocalStrategy } from './auths/local.auth';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    ValidatorsModule,
    UserModule,
    PassportModule,
    EmailModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [AuthService, LocalStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
