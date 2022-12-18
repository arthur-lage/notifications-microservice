import { Notification } from "@application/entities/notification/notification";
import { Content } from "@application/entities/notification/notifications-content";
import { Notification as RawNotification } from "@prisma/client";

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content,
      recipientId: notification.recipientId,
      canceledAt: notification.canceledAt,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification({
      id: raw.id,
      category: raw.category,
      content: new Content(raw.content).value,
      recipientId: raw.recipientId,
      canceledAt: raw.canceledAt,
      readAt: raw.readAt,
      createdAt: raw.createdAt,
    });
  }
}
