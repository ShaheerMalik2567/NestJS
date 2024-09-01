import { ApiProperty } from '@nestjs/swagger';
import { BaseUser } from './base-user.dto';

export class UpdateUserDto extends BaseUser {
  @ApiProperty({ default: new Date() })
  updatedAt: Date;
}
