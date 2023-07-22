import { Module } from '@nestjs/common';
import { UserValidator } from './user.validator';

@Module({
  providers: [UserValidator],
  exports: [UserValidator],
})
export class ValidatorsModule {}
