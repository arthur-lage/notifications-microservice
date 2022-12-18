import { Notification } from "@application/entities/notification/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { NotificationNotFound } from "../../../../application/use-cases/errors/notification-not-found";

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

    if (!notification) {
      throw new NotificationNotFound();
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const mappedNotification = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      data: mappedNotification,
      where: {
        id: mappedNotification.id,
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

    return notifications.map((notification) =>
      PrismaNotificationMapper.toDomain(notification)
    );
  }

  async readNotification(notificationId: string): Promise<void> {
    const savedNotification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });

    if (!savedNotification) {
      throw new NotificationNotFound();
    }

    const notification = PrismaNotificationMapper.toDomain(savedNotification);

    notification.read();

    this.save(notification);
  }

  async unreadNotification(notificationId: string): Promise<void> {
    const savedNotification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });

    if (!savedNotification) {
      throw new NotificationNotFound();
    }

    const notification = PrismaNotificationMapper.toDomain(savedNotification);

    notification.unread();

    this.save(notification);
  }
}
