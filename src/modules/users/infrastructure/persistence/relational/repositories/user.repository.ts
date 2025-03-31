import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from '../../../../domain/user'
import { UserRepository } from '../../user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'
import { UserMapper } from '../mapper/user.mapper'
import { NullableType } from '../../../../../../common/utils/types'

@Injectable()
export class UsersRelationalRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data)
    const newEntity = await this.usersRepository.save(
      this.usersRepository.create(persistenceModel),
    )
    return UserMapper.toDomain(newEntity)
  }

  async findAll(): Promise<User[]> {
    const entities = await this.usersRepository.find()
    return entities.map((user) => UserMapper.toDomain(user))
  }

  async findById(id: User['id']): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOne({ where: { id } })
    return entity ? UserMapper.toDomain(entity) : null
  }

  async findByEmail(email: User['email']): Promise<NullableType<User>> {
    if (!email) return null
    const entity = await this.usersRepository.findOne({ where: { email } })
    return entity ? UserMapper.toDomain(entity) : null
  }

  async update(id: User['id'], payload: Partial<User>): Promise<User> {
    const entity = await this.usersRepository.findOne({ where: { id } })

    if (!entity) {
      throw new Error('User not found')
    }

    const updatedEntity = await this.usersRepository.save(
      this.usersRepository.create(
        UserMapper.toPersistence({
          ...UserMapper.toDomain(entity),
          ...payload,
        }),
      ),
    )

    return UserMapper.toDomain(updatedEntity)
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id)
  }
}
