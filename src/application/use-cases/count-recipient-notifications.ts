import { NotificationRepository } from "../repositories/notification-repository";
import { Injectable } from "@nestjs/common";

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationRespository: NotificationRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count =
      await this.notificationRespository.countRecipientNotifications(
        recipientId
      );

    return {
      count,
    };
  }
}
