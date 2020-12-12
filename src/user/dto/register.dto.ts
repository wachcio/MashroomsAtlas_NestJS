export enum userRoleEnum {
  'user' = 'user',
  'moderator' = 'moderator',
  'admin' = 'admin',
}

export class RegisterDto {
  username: string;
  pwd: string;
  role: userRoleEnum;
}
