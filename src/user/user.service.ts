import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schemas';
import { CreateUserDTO } from './dtos/create-user.dto';
// import { LoginUserDto } from './dtos/login-user.dto';



@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel.create(createUserDTO);
    return newUser.save();
  }
  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if(!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}