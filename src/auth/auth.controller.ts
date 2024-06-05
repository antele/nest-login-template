import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService){}

  
  @Post('login')
  singnIn(@Body() authUserDto: AuthUserDto){
    return this.authService.singIn(authUserDto)
  }
    
}
