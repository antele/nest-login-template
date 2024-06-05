import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategie';


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async(configService:ConfigService)=>({
        secret:configService.getOrThrow('SECRET_KEY'),
      }),
      inject:[ConfigService]
    }),
    UserModule,
    PassportModule.register({defaultStrategy:'local'})
  ],
  controllers: [AuthController],
  providers: [AuthService,  UserService,JwtStrategy],
  exports:[JwtStrategy, JwtModule]
})
export class AuthModule {}
