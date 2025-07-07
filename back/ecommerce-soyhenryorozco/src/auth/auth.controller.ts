import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/users/dtos/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() credentials: LoginDto) {
    const { email, password } = credentials;
    return this.authService.signIn(credentials);
  }

  @Post('/signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  // @Get()
  // getAuth() {
  //   return this.authService.getAuth();
  // }
}
