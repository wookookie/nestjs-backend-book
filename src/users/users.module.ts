import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { EmailModule } from "src/email/email.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule, EmailModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
