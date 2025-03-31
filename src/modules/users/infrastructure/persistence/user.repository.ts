import { DeepPartial, NullableType } from '../../../../common/utils/types'
import { User } from '../../domain/user'

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<User>
  abstract findById(id: User['id' | 'firebaseUid']): Promise<NullableType<User>>
  abstract findByEmail(email: User['email']): Promise<User | null>
  abstract findAll(): Promise<User[]>
  abstract update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | null>

  abstract remove(id: User['id']): Promise<void>
}
