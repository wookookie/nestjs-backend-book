import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ApiController } from "./api/api.controller";

@Module({
  imports: [UsersModule],
  controllers: [ApiController, AppController], // 1: ApiController(sub-domain) -> 2: AppController
  providers: [AppService],
})
export class AppModule {}
