import { ApiProperty } from '@nestjs/swagger'

export class User {
  @ApiProperty()
  id: string

  @ApiProperty()
  firebaseUid: string

  @ApiProperty()
  userName: string | null

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string | null

  @ApiProperty()
  profileImgUrl: string | null

  @ApiProperty()
  status: number

  @ApiProperty({ type: Date })
  createdAt: Date

  @ApiProperty()
  createdBy: object

  @ApiProperty({ type: Date })
  updatedAt: Date

  @ApiProperty()
  updatedBy: object
}
