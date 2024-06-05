import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTPayload } from "../interfaces/jwt-payload.interface";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
  constructor(
    private readonly userService:UserService,
    private configService:ConfigService
  ){
    super({
      secretOrKey:configService.get('SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JWTPayload){
    const {username}=payload
    const user= await this.userService.findOneByUserName(username)
    if(!user.isAuthorized) throw new UnauthorizedException('User unauthorized')

    return user;
  }

}