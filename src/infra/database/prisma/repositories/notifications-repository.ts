import { Notification } from "@application/entities/notification/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepositories implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async countRecipientNotifications(recipientId: string): Promise<number> {
    const notificationsCount = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notificationsCount.length;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    return notification;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    await this.prismaService.notification.update({
      data: notification,
      where: {
        id: notification.id,
      },
    });
  }

  async getRecipientNotifications(
    recipientId: string
  ): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications;
  }
}
