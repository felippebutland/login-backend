import { HttpException } from '@nestjs/common';
import { z } from 'zod';

export class UserValidator {
  validateOnCreate(user: CreateUserDto) {
    const schema = z.object({
      name: z.string().min(3).max(255),
      email: z.string().email(),
      password: z
        .string()
        .min(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
        .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])/i, {
          message:
            'A senha deve conter pelo menos 1 caractere especial e 1 número',
        }),
      cellphone: z.string().min(11).max(11),
    });

    try {
      schema.parse(user);
    } catch (error) {
      throw new HttpException(error.errors[0]?.message ?? 'Invalid data', 406);
    }
  }
}
