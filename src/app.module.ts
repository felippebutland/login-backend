import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { SchemasModule } from './schemas/schemas.module';
import { UserModule } from './user/user.module';
import { ValidatorsModule } from './validators/validators.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin@localhost:27017'),
    UserModule,
    AuthModule,
    EmailModule,
    ValidatorsModule,
    SchemasModule,
  ],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
