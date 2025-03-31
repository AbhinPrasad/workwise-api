import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column({ name: 'firebase_uid', unique: true })
  uid: string

  @Column({ unique: true })
  email: string

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, nullable: true })
  password?: string | null

  @Column({ type: String, nullable: true })
  userName: string | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'created_by', type: 'json' })
  createdBy: object

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ name: 'updated_by', type: 'json' })
  updatedBy: object

  @DeleteDateColumn()
  deletedAt: Date
}
