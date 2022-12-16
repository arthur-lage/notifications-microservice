import { Notification } from "@application/entities/notification/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countRecipientNotifications(recipientId: string): Promise<number> {
    const recipientNotifications = this.notifications.filter(
      (item) => item.recipientId === recipientId
    );

    return recipientNotifications.length;
  }

  async getRecipientNotifications(
    recipientId: string
  ): Promise<Notification[]> {
    const recipientNotifications = this.notifications.filter(
      (item) => item.recipientId === recipientId
    );

    return recipientNotifications;
  }
}
