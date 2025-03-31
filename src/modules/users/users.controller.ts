import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './domain/user'
import { UsersService } from './users.service'
import { CreatedBy } from '../../common/decorators/createdby.decorator'

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() createProfileDto: CreateUserDto,
    @CreatedBy() createdBy: ReqInfo,
  ): Promise<User> {
    return this.usersService.create(createProfileDto, createdBy)
  }
}
