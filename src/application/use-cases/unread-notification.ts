import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: UnreadNotificationRequest
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;
    await this.notificationRepository.unreadNotification(notificationId);
  }
}
