import { Transform } from "class-transformer";
import {
  MaxLength,
  MinLength,
  IsString,
  IsEmail,
  Matches,
} from "class-validator";
import { NotIn } from "src/utils/decorators/not-in";

export class CreateUserDto {
  @Transform((params) => params.value.trim())
  @NotIn("password", {
    message: "비밀번호는 사용자명과 같은 문자열을 포함할 수 없습니다.",
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
