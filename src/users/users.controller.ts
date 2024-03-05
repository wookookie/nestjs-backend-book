import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  Query,
  Headers,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserDto } from "./dto/get-users.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserInfo } from "./interfaces/user-info.interface";
import { AuthGuard } from "src/auth.guard";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post("email-verify")
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post("login")
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async getUserInfo(
    @Headers() headers: any,
    @Param("id") userId: string,
  ): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);
  }

  // http://localhost:3000/users
  // http://localhost:3000/users?offset=0&limit=0
  @Get()
  findAll(@Res() res, @Query() dto: GetUserDto) {
    console.log(dto);
    const users = this.usersService.findAll();
    return res.status(200).send(users); // Express response
  }

  @HttpCode(202)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Delete(":userId/memo/:memoId")
  deleteUserMemo(
    @Param("userId") userId: string,
    @Param("memoId") memoId: string,
  ) {
    return `userId: ${userId}, memoId: ${memoId}`;
  }
}
