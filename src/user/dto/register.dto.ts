import { IsEnum, IsString } from 'class-validator';

export enum userRoleEnum {
  'user' = 'user',
  'moderator' = 'moderator',
  'admin' = 'admin',
}

export class RegisterDto {
  @IsString()
  username: string;
  @IsString()
  pwd: string;
  @IsEnum(userRoleEnum)
  role: userRoleEnum;
}
