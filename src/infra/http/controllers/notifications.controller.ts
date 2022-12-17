import { Post, Controller, Body, Get, Param } from "@nestjs/common";
import { CreateNotificationDTO } from "../dtos/create-notification.dto";
import { SendNotification } from "@application/use-cases/send-notification";
import { NotificationViewModel } from "../view-models/notification-view-model";
import { CountRecipientNotifications } from "../../../application/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "../../../application/use-cases/get-recipient-notifications";

@Controller("notifications")
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotification,
    private countRecipientNotificationUseCase: CountRecipientNotifications,
    private getRecipientNotificationsUseCase: GetRecipientNotifications
  ) {}

  @Get("/count/:recipientId")
  async countRecipientNotification(@Param("recipientId") recipientId: string) {
    const { count } = await this.countRecipientNotificationUseCase.execute({
      recipientId,
    });

    return { count };
  }

  @Get("/:recipientId")
  async getRecipientNotifications(@Param("recipientId") recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return { notifications };
  }

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      category,
      content,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
