import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";
import { Notification } from "@application/entities/notification/notification";

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.getRecipientNotifications(recipientId);

    return {
      notifications,
    };
  }
}
