import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationsRepositories } from "./prisma/repositories/notifications-repository";
import { NotificationRepository } from "@application/repositories/notification-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepositories,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
