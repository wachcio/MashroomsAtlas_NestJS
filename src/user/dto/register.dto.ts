import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { messageMax, messageMin } from '../../utils/validation-message';

export enum userRoleEnum {
  'user' = 'user',
  'moderator' = 'moderator',
  'admin' = 'admin',
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, {
    message: messageMin('$property', '$constraint1'),
  })
  @MaxLength(255, {
    message: messageMax('$property', '$constraint1'),
  })
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: messageMin('$property', '$constraint1'),
  })
  @MaxLength(255, {
    message: messageMax('$property', '$constraint1'),
  })
  pwd: string;
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(userRoleEnum)
  role: userRoleEnum;
}
