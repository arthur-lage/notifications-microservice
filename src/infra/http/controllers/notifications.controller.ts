import { Post, Controller, Body } from "@nestjs/common";
import { CreateNotificationDTO } from "../../dtos/create-notification.dto";
import { SendNotification } from "../../../application/use-cases/send-notification";

@Controller("notifications")
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return { notification };
  }
}
