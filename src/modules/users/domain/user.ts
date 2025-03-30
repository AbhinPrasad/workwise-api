import { ApiProperty } from '@nestjs/swagger'

export class User {
  @ApiProperty()
  id: string

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
