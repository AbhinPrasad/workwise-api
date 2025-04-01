import {
  IsEmail,
  IsOptional,
  IsString,
  IsFirebasePushId,
  IsUrl,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  firebaseUid: string

  @IsString()
  @IsOptional()
  userName: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @IsOptional()
  password: string

  @IsUrl()
  @IsOptional()
  profileImgUrl: string
}
