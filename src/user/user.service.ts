import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // async create(createUserDto: CreateUserDto):Promise<User> {
  //   const user = this.usersRepository.create(createUserDto);
  //   return this.usersRepository.save(user);
  // }

  async findOneBy(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email: email });
  }

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save({
      ...createUserDto,
      createdAt: new Date(),
      id: Number(createUserDto.id),
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
