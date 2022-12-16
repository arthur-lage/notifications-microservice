import { Notification } from "@application/entities/notification/notification";

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content,
      category: notification.category,
      recipientId: notification.readAt,
    };
  }
}
