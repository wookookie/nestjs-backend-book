import { Module } from "@nestjs/common";
import { ApiController } from "./api/api.controller";

@Module({
  imports: [],
  controllers: [ApiController], // ApiController(sub-domain)
  providers: [],
})
export class AppModule {}
