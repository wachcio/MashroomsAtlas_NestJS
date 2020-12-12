import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserResponse } from '../interfaces/user';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { UserRoleAdminGuard } from 'src/guards/user-role-admin.guard';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post('/register')
  @UseGuards(AuthGuard('jwt'), UserRoleAdminGuard)
  register(@Body() newUser: RegisterDto): Promise<RegisterUserResponse> {
    return this.userService.register(newUser);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleAdminGuard)
  getOneUser(@Param('id') id: string): Promise<User> {
    return this.userService.getOneUser(id);
  }
}
