import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import emailConfig from "./config/email.config";
import { UsersModule } from "./users/users.module";
import { validationSchema } from "./config/validation.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
