import { Injectable } from '@nestjs/common';
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
    const user = new User();
    user.username = newUser.username;
    user.pwdHash = hashPwd(newUser.pwd);
    user.role = newUser.role;
    await user.save();

    return this.filter(user);
  }

  async getOneUser(id: string): Promise<User> {
    return await User.findOne(id);
  }

  @Command({
    command: 'list',
    description: 'List all of the users',
  })
  async listUsersCmd() {
    console.log((await User.find()).map(this.filter));
  }

  @Command({
    command: 'add <username> <pwd>',
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
