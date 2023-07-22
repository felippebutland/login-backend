import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schema/user.schema';
import { Model } from 'mongoose';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDto>,
  ) {}

  async createUser(user: CreateUserDto, verifyToken: string): Promise<any> {
    const createdUser = new this.userModel({
      ...user,
      verifyToken: verifyToken,
    });
    return createdUser.save();
  }

  async getUser(params?: Partial<UserDto>): Promise<UserDto> {
    return this.userModel.findOne(params).exec();
  }

  async inactiveUser(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { active: false }).exec();
  }

  async updateUser(user: Partial<UserDto>, id: string): Promise<void> {
    await this.userModel.updateOne({ _id: id }, user).exec();
  }
}
