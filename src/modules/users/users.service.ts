import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { UserRepository } from './infrastructure/persistence/user.repository'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './domain/user'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(
    createUserDto: CreateUserDto,
    createdBy: ReqInfo,
  ): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(
      createUserDto.email,
    )

    if (userExists) {
      throw new ConflictException('Email already exists')
    }

    let password: string | null = null

    if (createUserDto.password) {
      const salt = await bcrypt.genSalt()
      password = await bcrypt.hash(createUserDto.password, salt)
    }

    return this.usersRepository.create({
      ...createUserDto,
      password,
      createdBy,
    })
  }
}
