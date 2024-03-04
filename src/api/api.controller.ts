import { Controller, Get, HostParam } from "@nestjs/common";

// For test, add address to 'hosts' file
// 127.0.0.1       api.localhost
// 127.0.0.1       v1.api.localhost

// // http://api.localhost:3000
// @Controller({ host: "api.localhost" })
// export class ApiController {
//   @Get()
//   index(): string {
//     return "Hello, API";
//   }
// }

// API versioning
// http://v1.api.localhost:3000
@Controller({ host: ":version.api.localhost" })
export class ApiController {
  @Get()
  index(@HostParam("version") version: string): string {
    return `Hello, API ${version}`;
  }
}
