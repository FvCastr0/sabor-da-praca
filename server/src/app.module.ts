import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";
import { SalesModule } from "./sales/sales.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [ScheduleModule.forRoot(), SalesModule, UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}
