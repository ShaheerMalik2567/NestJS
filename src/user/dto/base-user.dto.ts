import { ApiProperty } from '@nestjs/swagger';

export class BaseUser {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  username?: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirmPassword?: string;
}

export class LoginUser {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
