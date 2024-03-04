import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ApiController } from "./api/api.controller";

@Module({
  imports: [UsersModule],
  controllers: [ApiController], // ApiController(sub-domain)
  providers: [],
})
export class AppModule {}
