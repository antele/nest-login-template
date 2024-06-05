import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
 
  @IsString()
  @IsNotEmpty()
  firstName:string;

  @IsString()
  lastName:string;

  @IsString()
  @IsNotEmpty()
  username:string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password:string;
  
  @IsString()
  @IsOptional()
  image?:string;

}
