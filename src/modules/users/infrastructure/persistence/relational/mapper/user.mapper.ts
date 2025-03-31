import { UserEntity } from '../entities/user.entity'
import { User } from '../../../../domain/user'

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const domainEntity = new User()
    domainEntity.id = raw.id
    domainEntity.firebaseUid = raw.uid
    domainEntity.email = raw.email
    domainEntity.password = raw.password ?? ''
    domainEntity.userName = raw.userName ?? ''
    domainEntity.profileImgUrl = raw.profileImgUrl ?? ''
    domainEntity.status = raw.status
    domainEntity.createdAt = raw.createdAt
    domainEntity.createdBy = raw.createdBy
    domainEntity.updatedAt = raw.updatedAt
    domainEntity.updatedBy = raw.updatedBy
    return domainEntity
  }

  static toPersistence(domainEntity: User): UserEntity {
    const persistenceEntity = new UserEntity()
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id
    }
    persistenceEntity.uid = domainEntity.firebaseUid
    persistenceEntity.email = domainEntity.email
    persistenceEntity.password = domainEntity.password
    persistenceEntity.userName = domainEntity.userName
    persistenceEntity.profileImgUrl = domainEntity.profileImgUrl
    persistenceEntity.status = domainEntity.status
    persistenceEntity.createdAt = domainEntity.createdAt
    persistenceEntity.createdBy = domainEntity.createdBy
    persistenceEntity.updatedAt = domainEntity.updatedAt
    persistenceEntity.updatedBy = domainEntity.updatedBy
    return persistenceEntity
  }
}
