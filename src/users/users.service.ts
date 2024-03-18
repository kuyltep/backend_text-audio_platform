import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.findByUsername(dto.username);
    const existingUserByEmail = await this.repository.findOneBy({
      email: dto.email,
    });
    if (existingUser) {
      throw new BadRequestException(
        `Пользователь ${dto.username} уже существует`,
      );
    } else if (existingUserByEmail) {
      throw new BadRequestException(`Email ${dto.email} уже существует`);
    }
    return this.repository.save(dto);
  }

  async findByUsername(username: string) {
    return this.repository.findOneBy({ username });
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }
}