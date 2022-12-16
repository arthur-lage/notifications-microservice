import {
  NotificationProps,
  Notification,
} from "@application/entities/notification/notification";
import { Content } from "@application/entities/notification/notifications-content";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    category: "social",
    content: new Content("You have received a new notification").value,
    recipientId: "recipient-1",
    ...override,
  });
}
