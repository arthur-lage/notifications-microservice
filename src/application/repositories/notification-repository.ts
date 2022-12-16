import { Notification } from "../entities/notification/notification";

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countRecipientNotifications(recipientId: string): Promise<number>;
  abstract getRecipientNotifications(
    recipientId: string
  ): Promise<Notification[]>;
}
