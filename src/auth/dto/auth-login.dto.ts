import { IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  username: string;

  @IsString()
  pwd: string;
}
