export enum userRole {
  'user',
  'moderator',
  'adimin',
}

export class RegisterDto {
  username: string;
  pwd: string;
  role: userRole;
}
