export enum userRoleEnum {
  'user' = 'user',
  'moderator' = 'moderator',
  'admin' = 'admin',
}
export interface RegisterUserResponse {
  id: string;
  username: string;
  role: userRoleEnum;
}
