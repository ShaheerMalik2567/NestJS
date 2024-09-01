import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { BaseUser, LoginUser } from 'src/user/dto/base-user.dto';
import { Public } from './public-strategy';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: LoginUser })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [BaseUser],
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @Header('Cache-Control', 'none')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [BaseUser],
  })
  @ApiOperation({ summary: 'User Signup' })
  @ApiBody({ type: BaseUser })
  async signUp(@Body() signUpDto: BaseUser) {
    const payload = {
      id: signUpDto.id,
      username: signUpDto.username,
      email: signUpDto.email,
      password: signUpDto.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.authService.signUp(payload);
  }
}
