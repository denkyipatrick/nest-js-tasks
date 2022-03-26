// import {   } from 'class-validator';

export class AuthCredentialsDto {
  // @IsString()
  // @MinLeng (4)
  // @MaxLength(20)
  username: string;

  // @IsString()
  // @MinLength(4)
  // @MaxLength(20)
  password: string;
}
