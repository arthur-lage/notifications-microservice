import { Module } from "@nestjs/common";
import { SendNotification } from "@application/use-cases/send-notification";
import { DatabaseModule } from "@infra/database/database.module";
import { NotificationsController } from "./notifications.controller";
import { CountRecipientNotifications } from "@application/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "@application/use-cases/get-recipient-notifications";
import { ReadNotification } from "@application/use-cases/read-notification";
import { UnreadNotification } from "@application/use-cases/unread-notification";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
