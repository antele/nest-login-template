import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    const {username, password}= createUserDto
    const userFound= await this.findOneByUserName(username)
    if(userFound) throw new BadRequestException('User already exists')

    
    const user= this.userRepository.create(createUserDto)
    const hash= await bcrypt.hash(password, 10)
    const newUser=await this.userRepository.save({
      ...user,
      password:hash
    })


    return newUser;
  }

  async findOneByUserName(username:string){
    try {
      const user= await this.userRepository.findOne({where:{username}})
      if(!user) throw new BadRequestException('User not found')
      return user
    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
