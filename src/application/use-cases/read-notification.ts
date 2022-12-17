import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: ReadNotificationRequest
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;
    await this.notificationRepository.readNotification(notificationId);
  }
}
