import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthUserDto } from './dto/auth-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService:UserService
  ){}

  async singIn(authUserDto: AuthUserDto){
    const user=await this.userService.findOneByUserName(authUserDto.username)
    if(!await bcrypt.compare( authUserDto.password, user.password)) throw new UnauthorizedException('User or password incorrect')
    
      const {password, ...rest}=user
      
      return rest
  }
}
