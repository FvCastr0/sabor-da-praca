import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { PrismaService } from "./prisma/prisma.service";
import { SalesModule } from "./sales/sales.module";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ScheduleModule.forRoot(), SalesModule, UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}
