import { SendNotification } from "./send-notification";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";

describe("Send Notification", () => {
  it("should be able to send a notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const { notification } = await new SendNotification(
      notificationRepository
    ).execute({
      category: "social",
      content: "You have received a new friend request.",
      recipientId: "123123123",
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
