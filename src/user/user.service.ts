import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterDto, userRoleEnum } from './dto/register.dto';
import { RegisterUserResponse } from '../interfaces/user';
import { User } from './user.entity';
import { hashPwd } from '../utils/hash-pwd';
import { Command, Console } from 'nestjs-console';
import { validateEmail } from 'src/utils/validate-email';
import { MailService } from '../mail/mail.service';
import { ResetPasswordRequestDto } from './dto/resetPasswordRequest.dto';

@Injectable()
@Console({
  name: 'users',
})
export class UserService {
  constructor(@Inject(MailService) public mailService: MailService) {}

  filter(user: User): RegisterUserResponse {
    const { username, email, role } = user;
    return { username, email, role };
  }

  async register(
    newUser: RegisterDto,
    registerFromCmd?: boolean,
  ): Promise<RegisterUserResponse> {
    if (!newUser.email || !validateEmail(newUser.email)) {
      throw new HttpException(`Email is not valid`, HttpStatus.BAD_REQUEST);
    }

    try {
      const user = new User();
      user.username = newUser.username;
      user.email = newUser.email;
      user.pwdHash = hashPwd(newUser.pwd);

      if (registerFromCmd) {
        user.role = newUser.role;
      } else {
        user.role = userRoleEnum.user;
      }

      await user.save();

      await this.mailService.sendWelcomeMessage(user);
      await this.mailService.sendMessageToAdmin(user);
      return this.filter(user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          `User '${newUser.username}' or email '${newUser.email}' is already exist.`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return err;
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
      user.email = updateUser.email;
      user.pwdHash = hashPwd(updateUser.pwd);
      user.role = updateUser.role;
      return await User.update(id, user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          `User '${updateUser.username}' or email '${updateUser.email}' is already exist.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async changePassword(user: User, pwd) {
    if (hashPwd(pwd.oldPwd) != user.pwdHash) {
      throw new HttpException(
        `Old password is not valid.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (pwd.oldPwd == pwd.newPwd) {
      throw new HttpException(
        `Old and new password is same.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      user.pwdHash = hashPwd(pwd.newPwd);
      await user.save();
      return {
        ok: true,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async resetPassword(userData: ResetPasswordRequestDto): Promise<any> {
    console.log(userData);

    try {
      if (
        await User.findOne({
          where: [{ username: userData.username, email: userData.email }],
        })
      ) {
        return {
          ok: 'Reset link send to your mail.',
        };
      } else {
        return {
          error: 'Username or mail not exist.',
        };
      }
    } catch (err) {
      return err;
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
    command: 'add <username> <email> <pwd> <role>',
    description: 'Add new user',
  })
  async addUsersCmd(
    username: string,
    email: string,
    pwd: string,
    role: userRoleEnum,
  ) {
    console.log(
      await this.register(
        {
          username,
          email,
          pwd,
          role,
        },
        true,
      ),
    );
  }

  @Command({
    command: 'delete <id>',
    description: 'Delete user',
  })
  async deleteUserCmd(id: string) {
    console.log(await this.deleteUser(id));
  }

  @Command({
    command: 'update <id> <username> <email> <pwd> <role>',
    description: 'Update user',
  })
  async updateUserCmd(
    id: string,
    username: string,
    email: string,
    pwd: string,
    role: userRoleEnum,
  ) {
    console.log(await this.updateUser(id, { username, email, pwd, role }));
  }

  @Command({
    command: 'changePassword <userId> <oldPwd> <newPwd>',
    description: 'Change user passowrd',
  })
  async changePasswordCmd(id: string, oldPwd: string, newPwd: string) {
    const user = await User.findOne(id);
    if (!user) {
      throw new HttpException(
        `User ID ${id} not exist.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log(await this.changePassword(user, { oldPwd, newPwd }));
  }
}
