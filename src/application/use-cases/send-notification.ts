import { Notification } from "../entities/notification/notification";
import { Content } from "../entities/notification/notifications-content";
import { NotificationRepository } from "../repositories/notification-repository";
import { Injectable } from "@nestjs/common";

interface SendNotificationResponse {
  notification: Notification;
}

interface SendNotificationRequest {
  content: string;
  category: string;
  recipientId: string;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: SendNotificationRequest
  ): Promise<SendNotificationResponse> {
    const { content, category, recipientId } = request;

    const notification = await new Notification({
      recipientId,
      category,
      content: new Content(content).value,
    });

    await this.notificationRepository.create(notification);

    return { notification };
  }
}
