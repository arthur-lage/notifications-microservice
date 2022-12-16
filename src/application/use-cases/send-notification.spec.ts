import { SendNotification } from "./send-notification";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { makeNotification } from "../../../test/factories/notification-factory";

describe("Send Notification", () => {
  it("should be able to send a notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const { notification } = await new SendNotification(
      notificationRepository
    ).execute(makeNotification());

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
