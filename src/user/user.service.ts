import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto, userRoleEnum } from './dto/register.dto';
import { RegisterUserResponse } from '../interfaces/user';
import { User } from './user.entity';
import { hashPwd } from '../utils/hash-pwd';
import { Command, Console } from 'nestjs-console';

@Injectable()
@Console({
  name: 'users',
})
export class UserService {
  filter(user: User): RegisterUserResponse {
    const { id, username, role } = user;
    return { id, username, role };
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    try {
      const user = new User();
      user.username = newUser.username;
      user.pwdHash = hashPwd(newUser.pwd);
      user.role = newUser.role;
      await user.save();

      return this.filter(user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          `User '${newUser.username}' is already exist.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await User.find();
  }
  async getOneUser(id: string): Promise<User> {
    return await User.findOne(id);
  }

  async deleteUser(id: string) {
    const userId = await User.findOne({
      where: [{ id }],
    });

    if (!userId) {
      throw new HttpException(
        `I can not find user id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return User.delete(id);
  }
  async updateUser(id: string, updateUser: RegisterDto) {
    try {
      const user = new User();
      user.username = updateUser.username;
      user.pwdHash = hashPwd(updateUser.pwd);
      user.role = updateUser.role;
      return await User.update(id, user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          `User '${updateUser.username}' is already exist.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  @Command({
    command: 'list',
    description: 'List all of the users',
  })
  async listUsersCmd() {
    console.log((await User.find()).map(this.filter));
  }

  @Command({
    command: 'add <username> <pwd> <role>',
    description: 'Add new user',
  })
  async addUsersCmd(username: string, pwd: string, role: userRoleEnum) {
    console.log(
      await this.register({
        username,
        pwd,
        role,
      }),
    );
  }
}
