import { Post, Controller, Body, Get, Param, Patch } from "@nestjs/common";
import { CreateNotificationDTO } from "../dtos/create-notification.dto";
import { SendNotification } from "@application/use-cases/send-notification";
import { NotificationViewModel } from "../view-models/notification-view-model";
import { CountRecipientNotifications } from "../../../application/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "../../../application/use-cases/get-recipient-notifications";
import { ReadNotification } from "../../../application/use-cases/read-notification";
import { UnreadNotification } from "../../../application/use-cases/unread-notification";
import { CancelNotification } from "../../../application/use-cases/cancel-notification";

@Controller("notifications")
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotification,
    private getRecipientNotificationsUseCase: GetRecipientNotifications,
    private countRecipientNotificationUseCase: CountRecipientNotifications,
    private readNotificationUseCase: ReadNotification,
    private unreadNotificationUseCase: UnreadNotification,
    private cancelNotificationUseCase: CancelNotification
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

  @Patch("/read/:notificationId")
  async readNotification(@Param("notificationId") notificationId: string) {
    await this.readNotificationUseCase.execute({
      notificationId,
    });
  }

  @Patch("/unread/:notificationId")
  async unreadNotification(@Param("notificationId") notificationId: string) {
    await this.unreadNotificationUseCase.execute({
      notificationId,
    });
  }

  @Patch("/cancel/:notificationId")
  async cancelNotification(@Param("notificationId") notificationId: string) {
    await this.cancelNotificationUseCase.execute({
      notificationId,
    });
  }
}
